import { ApiProperty } from '@nestjs/swagger';

export class WinnerEntity {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  wins: number;

  @ApiProperty({ example: 10 })
  time: number;
}
