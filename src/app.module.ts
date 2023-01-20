import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GarageModule } from './garage/garage.module';
import { WinnersModule } from './winners/winners.module';
import { EngineModule } from './engine/engine.module';

@Module({
  imports: [ConfigModule.forRoot(), GarageModule, WinnersModule, EngineModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
