import { ApiProperty } from '@nestjs/swagger';

export class CarEntity {
  @ApiProperty({ example: 2 })
  id: number;

  @ApiProperty({ example: 'BMW' })
  name: string;

  @ApiProperty({ example: '#fede00' })
  color: string;
}
