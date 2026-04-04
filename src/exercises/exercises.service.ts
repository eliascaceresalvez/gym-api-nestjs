import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exercisesRepository: Repository<Exercise>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto): Promise<Exercise> {
    this.assertValidIsoDate(createExerciseDto.date);

    const exercise = this.exercisesRepository.create({
      name: createExerciseDto.name,
      weight: createExerciseDto.weight,
      reps: createExerciseDto.reps,
      sets: createExerciseDto.sets,
      date: createExerciseDto.date,
      user: { id: createExerciseDto.userId },
    });

    return this.exercisesRepository.save(exercise);
  }

  findAll(userId: number): Promise<Exercise[]> {
    return this.exercisesRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Exercise> {
    const exercise = await this.exercisesRepository.findOneBy({ id });

    if (!exercise) {
      this.throwNotFound(id);
    }

    return exercise;
  }

  async update(id: number, userId: number, updateExerciseDto: UpdateExerciseDto): Promise<Exercise> {
    const exercise = await this.exercisesRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!exercise) {
      throw new NotFoundException(`Exercise with id ${id} not found`);
    }

    if (updateExerciseDto.date !== undefined) {
      this.assertValidIsoDate(updateExerciseDto.date);
    }

    const allowedFields: (keyof Exercise)[] = ['name', 'weight', 'reps', 'sets', 'date'];
    const updateData: Partial<Exercise> = {};

    for (const field of allowedFields) {
      if (updateExerciseDto[field] !== undefined) {
        updateData[field] = updateExerciseDto[field] as any;
      }
    }

    Object.assign(exercise, updateData);

    return this.exercisesRepository.save(exercise);
  }

  async remove(id: number): Promise<void> {
    const result = await this.exercisesRepository.delete(id);

    if (!result.affected) {
      this.throwNotFound(id);
    }
  }

  private throwNotFound(id: number): never {
    throw new NotFoundException(`Exercise with id ${id} not found`);
  }

  private assertValidIsoDate(value: string): void {
    const parsed = new Date(value);

    if (Number.isNaN(parsed.getTime())) {
      throw new BadRequestException('Invalid date value. Use a valid ISO date string.');
    }
  }
}
