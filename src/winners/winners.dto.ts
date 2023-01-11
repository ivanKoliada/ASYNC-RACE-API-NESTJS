import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsNumber, IsOptional } from 'class-validator';

export class GetWinnersDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  _page?: number;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  _limit?: number;

  @ApiProperty({ example: 'wins', required: false })
  @IsOptional()
  @IsIn(['id', 'wins', 'time'])
  _sort?: 'id' | 'wins' | 'time';

  @ApiProperty({ example: 'DESC', required: false })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  _order?: 'ASC' | 'DESC';
}
export class CreateWinnerDto {
  @ApiProperty({ example: 2 })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  wins: number;

  @ApiProperty({ example: 2.25 })
  @IsNumber()
  time: number;
}

export class UpdateWinnerDto {
  @ApiProperty({ example: 4 })
  @IsNumber()
  wins: number;

  @ApiProperty({ example: 3.54 })
  @IsNumber()
  time: number;
}
