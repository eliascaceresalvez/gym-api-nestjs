import { IsDateString, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateExerciseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  weight?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  reps?: number;

  @IsOptional()
  @IsDateString()
  date?: string;
}
