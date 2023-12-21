import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Livestock {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  type!: string;

  @Column()
  breed!: string;

  @Column()
  age!: number;

  @Column()
  healthStatus!: string;
}
