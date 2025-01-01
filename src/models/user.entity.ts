import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, nullable: true })
  firstname: string;

  @Column('varchar', { length: 50, nullable: true })
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  picture: string;
}
