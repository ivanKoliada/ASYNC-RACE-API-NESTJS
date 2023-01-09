import { IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  name: string;

  @IsString()
  color: string;
}

export class UpdateCarDto {
  @IsString()
  name: string;

  @IsString()
  color: string;
}
