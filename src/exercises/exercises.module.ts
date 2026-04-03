import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from './entities';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { User } from '../users/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, User])],
  controllers: [ExercisesController],
  providers: [ExercisesService],
})
export class ExercisesModule {}
