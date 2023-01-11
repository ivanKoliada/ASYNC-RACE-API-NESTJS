import { ApiProperty } from '@nestjs/swagger';

export class EngineEntity {
  @ApiProperty({ example: 64 })
  velocity: number;

  @ApiProperty({ example: 500000 })
  distance: number;
}

export class SuccessDriveMode {
  @ApiProperty()
  success: boolean;
}
