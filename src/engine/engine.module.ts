import { Module } from '@nestjs/common';
import { EngineService } from './engine.service';
import { EngineController } from './engine.controller';
import { GarageModule } from '../garage/garage.module';

@Module({
  imports: [GarageModule],
  providers: [EngineService],
  controllers: [EngineController],
})
export class EngineModule {}
