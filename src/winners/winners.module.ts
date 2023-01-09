import { Module } from '@nestjs/common';
import { WinnersService } from './winners.service';
import { WinnersController } from './winners.controller';

@Module({
  providers: [WinnersService],
  controllers: [WinnersController],
})
export class WinnersModule {}
