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

  async create(dto: CreateExerciseDto): Promise<Exercise> {
    this.assertValidIsoDate(dto.date);

    const exercise = this.exercisesRepository.create({
      name: dto.name,
      weight: dto.weight,
      reps: dto.reps,
      date: dto.date,
    });

    return this.exercisesRepository.save(exercise);
  }

  findAll(): Promise<Exercise[]> {
    return this.exercisesRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number): Promise<Exercise> {
    const exercise = await this.exercisesRepository.findOneBy({ id });

    if (!exercise) {
      this.throwNotFound(id);
    }

    return exercise;
  }

  async update(id: number, dto: UpdateExerciseDto): Promise<Exercise> {
    const exercise = await this.findOne(id);

    if (dto.date !== undefined) {
      this.assertValidIsoDate(dto.date);
    }

    const patch = Object.fromEntries(
      Object.entries(dto).filter(([, value]) => value !== undefined),
    ) as Partial<Pick<Exercise, 'name' | 'weight' | 'reps' | 'date'>>;

    Object.assign(exercise, patch);

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
