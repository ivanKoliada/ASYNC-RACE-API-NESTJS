import {
  Controller,
  Get,
  Param,
  Body,
  Delete,
  Header,
  Post,
  Put,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateCarDto, UpdateCarDto } from './garage.dto';
import { GarageService } from './garage.service';

@Controller('garage')
export class GarageController {
  constructor(private readonly garageService: GarageService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getCars(
    @Query('_page') _page?: number,
    @Query('_limit') _limit?: number,
    @Res() res?: Response,
  ) {
    const cars = await this.garageService.getCars(_page, _limit);

    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
    res.set('X-Total-Count', `${this.garageService.cars.length}`);

    return res.end(JSON.stringify(cars));
  }

  @Get(':id')
  async getCar(@Param('id', new ParseIntPipe()) id: number) {
    const car = await this.garageService.getCar(id);
    if (car) return car;

    throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async createCar(@Body() createCarDto: CreateCarDto) {
    return await this.garageService.createCar(createCarDto);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async updateCar(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateCarDto: UpdateCarDto,
  ) {
    const car = await this.garageService.getCar(id);
    if (car) return await this.garageService.updateCar(id, updateCarDto);

    throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @Header('Content-Type', 'application/json')
  async deleteCar(@Param('id', new ParseIntPipe()) id: number) {
    const car = await this.garageService.getCar(id);
    if (car) return await this.garageService.deleteCar(id);

    throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
  }
}
