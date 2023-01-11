import { Type } from 'class-transformer';
import { IsIn, IsNumber } from 'class-validator';

export class SwitchEngineDto {
  @IsNumber()
  @Type(() => Number)
  id: number;

  @IsIn(['started', 'stopped', 'drive'])
  status: 'started' | 'stopped' | 'drive';
}
