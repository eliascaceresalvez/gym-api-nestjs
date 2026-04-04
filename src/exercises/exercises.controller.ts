import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, UseGuards, Request } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities';
import { ExercisesService } from './exercises.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createExerciseDto: CreateExerciseDto,
    @Request() req,
  ): Promise<Exercise> {
    return this.exercisesService.create({
      ...createExerciseDto,
      userId: req.user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req): Promise<Exercise[]> {
    return this.exercisesService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Exercise> {
    return this.exercisesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExerciseDto: UpdateExerciseDto,
    @Request() req,
  ): Promise<Exercise> {
    return this.exercisesService.update(id, req.user.id, updateExerciseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.exercisesService.remove(id);
  }
}
