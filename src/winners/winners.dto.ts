import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class GetWinnersDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  _page?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  _limit?: number;

  @IsOptional()
  @IsIn(['id', 'wins', 'time'])
  _sort?: 'id' | 'wins' | 'time';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  _order?: 'ASC' | 'DESC';
}
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
