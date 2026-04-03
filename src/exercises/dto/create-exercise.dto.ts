import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @IsPositive()
  weight: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  reps: number;

  @IsDateString({ strict: true })
  date: string;

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  userId: number;
}
