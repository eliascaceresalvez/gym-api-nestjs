import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExercisesStore } from './exercises.store';
import { Exercise } from './interfaces/exercise.interface';

@Injectable()
export class ExercisesService {
  constructor(private readonly store: ExercisesStore) {}

  create(createExerciseDto: CreateExerciseDto): Exercise {
    const exercise: Exercise = {
      id: this.store.nextId++,
      name: createExerciseDto.name,
      weight: createExerciseDto.weight,
      reps: createExerciseDto.reps,
      date: this.parseDate(createExerciseDto.date),
    };

    this.store.exercises.push(exercise);
    return exercise;
  }

  findAll(): Exercise[] {
    return [...this.store.exercises];
  }

  findOne(id: number): Exercise {
    const exercise = this.store.exercises.find((item) => item.id === id);

    if (!exercise) {
      throw new NotFoundException(`Exercise with id ${id} not found`);
    }

    return exercise;
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto): Exercise {
    const exercise = this.findOne(id);

    if (updateExerciseDto.name !== undefined) {
      exercise.name = updateExerciseDto.name;
    }

    if (updateExerciseDto.weight !== undefined) {
      exercise.weight = updateExerciseDto.weight;
    }

    if (updateExerciseDto.reps !== undefined) {
      exercise.reps = updateExerciseDto.reps;
    }

    if (updateExerciseDto.date !== undefined) {
      exercise.date = this.parseDate(updateExerciseDto.date);
    }

    return exercise;
  }

  remove(id: number): void {
    const exerciseIndex = this.store.exercises.findIndex((item) => item.id === id);

    if (exerciseIndex === -1) {
      throw new NotFoundException(`Exercise with id ${id} not found`);
    }

    this.store.exercises.splice(exerciseIndex, 1);
  }

  private parseDate(value: string): Date {
    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date value. Use a valid date.');
    }

    return parsedDate;
  }
}
