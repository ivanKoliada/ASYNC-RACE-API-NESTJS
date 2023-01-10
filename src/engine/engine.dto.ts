import { IsIn, IsNumber } from 'class-validator';

export class SwitchEngineDto {
  @IsNumber()
  id: number;

  @IsIn(['started', 'stopped', 'drive'])
  status: 'started' | 'stopped' | 'drive';
}
