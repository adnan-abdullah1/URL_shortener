import { UserType } from 'src/enum/user-type';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { URL } from './url.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 250, nullable: true })
  firstname: string;

  @Column('varchar', { length: 250, nullable: true })
  lastname: string;

  @Column({ unique: true })
  email: string;

  // nullable bkz, google oauth doesnt share password
  @Column('varchar', { length: 250, nullable: true })
  password: string;

  @Column('enum', {
    enum: UserType,
    default: UserType.System,
  })
  user_type: UserType;

  @Column('varchar', { length: 250, nullable: true })
  picture: string;

  @OneToMany(() => URL, (url) => url.user)
  urls: URL[];
}
