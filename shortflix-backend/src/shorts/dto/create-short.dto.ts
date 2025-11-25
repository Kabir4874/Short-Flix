import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateShortDto {
  @IsUrl()
  @IsNotEmpty()
  videoUrl: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];
}
