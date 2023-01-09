import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GarageModule } from './garage/garage.module';

@Module({
  imports: [ConfigModule.forRoot(), GarageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
