import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateExerciseDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @IsPositive()
  weight?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  reps?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  sets?: number;

  @IsOptional()
  @IsDateString({ strict: true })
  date?: string;
}
