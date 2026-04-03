import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('float')
  weight: number;

  @Column('int')
  reps: number;

  /** ISO 8601 date string (e.g. 2026-03-26) */
  @Column()
  date: string;

  @ManyToOne(() => User, (user) => user.exercises, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
