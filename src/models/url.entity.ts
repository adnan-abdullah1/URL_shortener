import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class URL {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ unique: true })
  hash: string;

  @Column('int', { default: 0 })
  click_count: number;

  // on delete of user, i don't want to delete corresponding urls
  @ManyToOne(() => User, (user) => user.urls, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
