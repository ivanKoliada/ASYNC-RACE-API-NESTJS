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
  HttpCode,
} from '@nestjs/common';
import { CreateCarDto, UpdateCarDto } from './garage.dto';
import { GarageService } from './garage.service';

@Controller('garage')
export class GarageController {
  constructor(private readonly garageService: GarageService) {}

  @Get()
  async getCars() {
    return await this.garageService.getCars();
  }

  @Get(':id')
  async getCar(@Param('id') id: number) {
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
  async updateCar(@Param('id') id: number, @Body() updateCarDto: UpdateCarDto) {
    const car = this.garageService.getCar(id);
    if (car) return await this.garageService.updateCar(id, updateCarDto);

    throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteCar(@Param('id') id: number) {
    const car = this.garageService.getCar(id);
    if (car) return await this.garageService.deleteCar(id);

    throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
  }
}
