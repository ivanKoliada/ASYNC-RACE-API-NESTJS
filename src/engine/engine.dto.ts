import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsNumber } from 'class-validator';

export class QueryEngineDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty({ example: "'started', 'stopped', 'drive'" })
  @IsIn(['started', 'stopped', 'drive'])
  status: 'started' | 'stopped' | 'drive';
}
