import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class GetWinnersDto {
  @IsNumber()
  @IsOptional()
  _page?: number;

  @IsNumber()
  @IsOptional()
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
