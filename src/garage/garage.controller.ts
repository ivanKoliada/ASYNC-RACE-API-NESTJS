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
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CreateCarDto, QueryGarageDto, UpdateCarDto } from './garage.dto';
import { CarEntity } from './garage.entity';
import { GarageService } from './garage.service';

@ApiTags('garage')
@Controller('garage')
export class GarageController {
  constructor(private readonly garageService: GarageService) {}

  @Get()
  @ApiOperation({
    summary: 'Get cars',
  })
  @ApiOkResponse({
    type: [CarEntity],
    description: 'OK',
  })
  @Header('Content-Type', 'application/json')
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  async getCars(
    @Query() queryGarageDto: QueryGarageDto,
    @Res() res?: Response,
  ) {
    const cars = await this.garageService.getCars(queryGarageDto);

    res.set('X-Total-Count', `${this.garageService.cars.length}`);

    return res.end(JSON.stringify(cars));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get car by id',
  })
  @ApiOkResponse({
    type: CarEntity,
    description: 'OK',
  })
  @ApiNotFoundResponse({
    schema: { type: 'object' },
    description: 'NOT FOUND',
  })
  async getCar(@Param('id', new ParseIntPipe()) id: number) {
    const car = await this.garageService.getCar(id);
    if (car) return car;

    throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
  }

  @Post()
  @ApiOperation({
    summary: 'Create car',
  })
  @ApiCreatedResponse({
    type: CarEntity,
    description: 'CREATED',
  })
  @Header('Content-Type', 'application/json')
  async createCar(@Body() createCarDto: CreateCarDto) {
    return await this.garageService.createCar(createCarDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update car by id',
  })
  @ApiOkResponse({ type: CarEntity, description: 'OK' })
  @ApiNotFoundResponse({
    schema: { type: 'object' },
    description: 'NOT FOUND',
  })
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
  @ApiOperation({
    summary: 'Delete car by id',
  })
  @ApiOkResponse({ schema: { type: 'object' }, description: 'OK' })
  @ApiNotFoundResponse({
    schema: { type: 'object' },
    description: 'NOT FOUND',
  })
  @Header('Content-Type', 'application/json')
  async deleteCar(@Param('id', new ParseIntPipe()) id: number) {
    const car = await this.garageService.getCar(id);
    if (car) return await this.garageService.deleteCar(id);

    throw new HttpException('Car not found', HttpStatus.NOT_FOUND);
  }
}
