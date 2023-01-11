import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ example: 'Tesla' })
  @IsString()
  name: string;

  @ApiProperty({ example: '#e6e6fa' })
  @IsString()
  color: string;
}

export class UpdateCarDto {
  @ApiProperty({ example: 'Mercedes' })
  @IsString()
  name: string;

  @ApiProperty({ example: '#ef3c40' })
  @IsString()
  color: string;
}

export class QueryGarageDto {
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
}
