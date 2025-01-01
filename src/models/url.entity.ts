import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class URL {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ unique: true })
  hash: string;
}
