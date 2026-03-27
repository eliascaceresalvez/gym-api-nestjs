import { Injectable } from '@nestjs/common';
import { Exercise } from './interfaces/exercise.interface';

@Injectable()
export class ExercisesStore {
  public readonly exercises: Exercise[] = [
    {
      id: 1,
      name: 'press banca',
      weight: 80,
      reps: 10,
      date: new Date('2026-03-26'),
    },
  ];

  public nextId = 2;
}
