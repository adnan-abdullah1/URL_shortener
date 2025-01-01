import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class HashCounter {
  @PrimaryGeneratedColumn()
  id: number = 1;

  @Column('bigint')
  count: number;
}
