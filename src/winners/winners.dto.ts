import { IsNumber } from 'class-validator';

export class CreateWinnerDto {
  @IsNumber()
  id: number;

  @IsNumber()
  wins: number;

  @IsNumber()
  time: number;
}

export class UpdateWinnerDto {
  @IsNumber()
  wins: number;

  @IsNumber()
  time: number;
}
