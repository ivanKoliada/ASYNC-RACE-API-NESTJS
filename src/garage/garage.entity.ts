import { ApiProperty } from '@nestjs/swagger';

export class CarEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;
}
