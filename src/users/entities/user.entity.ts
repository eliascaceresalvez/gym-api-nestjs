import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exercise } from '../../exercises/entities/exercise.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];
}