import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Base62Chars } from 'src/constants/constants';
import { HashCounter } from 'src/models/hash-counter.entity';
import { URL } from 'src/models/url.entity';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UrlShortenerService {
  private readonly logger = new Logger(UrlShortenerService.name);
  private num = 0;

  constructor(
    @InjectRepository(URL)
    private urlRepository: Repository<URL>,
    @InjectRepository(HashCounter)
    private hashCounter: Repository<HashCounter>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.getHashCounter();
  }

  /**
   *  Save url to db
   * @param data
   * @returns Promise<URL>
   */
  saveUrl(data: {
    url: string;
    hash: string;
    id: string;
    user: User;
  }): Promise<URL> {
    return this.urlRepository.save(data);
  }

  /**
   * method to convert number to base62
   * @param number
   * @returns   Promise<string>
   */
  async convertToBase62(number = this.num): Promise<string> {
    let base62 = '';
    while (number > 0) {
      const remainder = number % 62;
      base62 = Base62Chars[remainder] + base62;
      number = Math.floor(number / 62);
    }

    this.num += 1;
    await this.saveHashCounter();

    return base62;
  }

  /**
   * method to convert base62 to number
   */
  async saveHashCounter() {
    const isCounterUpdated = await this.hashCounter.update(
      { id: 1 },
      { count: this.num + 1 },
    );

    if (!isCounterUpdated) {
      throw new Error('Error in updating hash counter');
    }
  }

  async updateClickCount(url: string) {
    await this.urlRepository
      .createQueryBuilder()
      .update(URL)
      .set({
        click_count: () => 'click_count + 1',
      })
      .where('url = :url', { url })
      .execute();
  }
  /**
   * Get hash counter from db
   * @returns Promise<void>
   */
  async getHashCounter(): Promise<void> {
    const hashCounterData = await this.hashCounter.find();
    if (Array.isArray(hashCounterData) && hashCounterData.length == 1) {
      this.num = +hashCounterData[0].count; // parse to int
    } else {
      this.hashCounter.save({ id: 1, count: 1 });
      this.num = 1;
    }
  }

  /**
   * Get url from db by hash
   * @param hash
   * @returns Promise<{url:string}>
   */
  async getURL(hash: string): Promise<string> {
    try {
      // Try to get url from cache
      const cacheKey = `url_${hash}`;
      const cachedUrl = await this.cacheManager.get<string>(cacheKey);
      if (cachedUrl) {
        this.logger.log('Returning from cache');
        return cachedUrl;
      }

      // when not found from cache, fetch from db
      const urlEntity = await this.urlRepository.findOne({
        where: { hash },
        select: ['url'],
      });

      if (!urlEntity || !urlEntity.url) {
        throw new Error('URL not found');
      }

      // Set the result in the cache
      await this.cacheManager.set(cacheKey, urlEntity.url); // Will be cached for one day
      this.logger.log('Data set in cache');
      this.logger.log('Returning URL from DB');
      return urlEntity.url;
    } catch (error) {
      this.logger.error('Error in getURL:', error);
      throw error;
    }
  }

  /**
   * Get url from db by URL table
   * @param url
   * @returns Promise<URL>
   */
  async getURLbyURL(url: string): Promise<URL> {
    return this.urlRepository.findOne({ where: { url }, select: ['hash'] });
  }

  async getClickCount(userId: string) {
    return this.urlRepository.find({ where: { user: { id: userId } } });
  }
}
