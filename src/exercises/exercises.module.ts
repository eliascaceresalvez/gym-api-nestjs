import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { ExercisesStore } from './exercises.store';

@Module({
  controllers: [ExercisesController],
  providers: [ExercisesService, ExercisesStore],
})
export class ExercisesModule {}
