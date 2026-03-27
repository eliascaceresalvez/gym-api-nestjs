import { IsString, IsNotEmpty, IsNumber, IsPositive, IsDateString } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  weight: number;

  @IsNumber()
  @IsPositive()
  reps: number;

  @IsDateString()
  date: string;
}
