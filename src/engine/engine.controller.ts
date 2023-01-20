import {
  Controller,
  Header,
  HttpException,
  HttpStatus,
  Patch,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiBadRequestResponse,
  ApiTooManyRequestsResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Response } from 'express';
import { GarageService } from 'src/garage/garage.service';
import { QueryEngineDto } from './engine.dto';
import { EngineEntity, SuccessDriveMode } from './engine.entity';
import { EngineService } from './engine.service';

@ApiTags('engine')
@Controller('engine')
export class EngineController {
  constructor(
    private readonly garageService: GarageService,
    private readonly engineService: EngineService,
  ) {}

  @Patch()
  @ApiOperation({
    summary: 'Switch engine mode',
  })
  @ApiOkResponse({
    type: EngineEntity,
    description: 'OK',
  })
  @ApiResponse({
    status: 201,
    type: SuccessDriveMode,
    description: 'OK (STATUS CODE 200)',
  })
  @ApiBadRequestResponse({
    description:
      'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"',
  })
  @ApiNotFoundResponse({
    description: `Car with such id was not found in the garage or
       Engine parameters for car with such id was not found in the garage. Have you tried to set engine status to "started" before?`,
  })
  @ApiTooManyRequestsResponse({
    description:
      "Drive already in progress. You can't run drive for the same car twice while it's not stopped.",
  })
  @ApiInternalServerErrorResponse({
    description: "Car has been stopped suddenly. It's engine was broken down.",
  })
  @Header('Content-Type', 'application/json')
  async switchEngine(
    @Query() queryEngineDto: QueryEngineDto,
    @Res() res: Response,
  ) {
    const car = await this.garageService.getCar(queryEngineDto.id);

    if (car) {
      return await this.engineService.switchEngine(queryEngineDto, res);
    }

    throw new HttpException(
      'Car with such id was not found in the garage.',
      HttpStatus.NOT_FOUND,
    );
  }
}
