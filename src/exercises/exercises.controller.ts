import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExercisesService } from './exercises.service';
import type { Exercise } from './interfaces/exercise.interface';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto): Exercise {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get()
  findAll(): Exercise[] {
    return this.exercisesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Exercise {
    return this.exercisesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExerciseDto: UpdateExerciseDto): Exercise {
    return this.exercisesService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.exercisesService.remove(id);
  }
}
