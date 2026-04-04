import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column('float')
  weight!: number;

  @Column('int')
  reps!: number;

  @Column('int')
  sets!: number;

  @Column()
  date!: string;

  @ManyToOne(() => User, (user) => user.exercises, { onDelete: 'CASCADE' })
  @JoinColumn()
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
