import {
  Controller,
  Header,
  HttpException,
  HttpStatus,
  Patch,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GarageService } from 'src/garage/garage.service';
import { SwitchEngineDto } from './engine.dto';
import { EngineService } from './engine.service';

@ApiTags('engine')
@Controller('engine')
export class EngineController {
  constructor(
    private readonly garageService: GarageService,
    private readonly engineService: EngineService,
  ) {}

  @Patch()
  @Header('Content-Type', 'application/json')
  async switchEngine(
    @Query() switchEngineDto: SwitchEngineDto,
    @Res() res: Response,
  ) {
    const car = await this.garageService.getCar(switchEngineDto.id);

    if (car) {
      return await this.engineService.switchEngine(switchEngineDto, res);
    }

    throw new HttpException(
      'Car with such id was not found in the garage.',
      HttpStatus.NOT_FOUND,
    );
  }
}
