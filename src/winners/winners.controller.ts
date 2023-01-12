import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { CreateWinnerDto, GetWinnersDto, UpdateWinnerDto } from './winners.dto';
import { WinnerEntity } from './winners.entity';
import { WinnersService } from './winners.service';

@ApiTags('winners')
@Controller('winners')
export class WinnersController {
  constructor(private readonly winnersService: WinnersService) {}

  @Get()
  @ApiOperation({
    summary: 'Get winners',
  })
  @ApiOkResponse({
    type: [WinnerEntity],
    description: 'OK',
  })
  @Header('Content-Type', 'application/json')
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  async getWinners(
    @Query() getWinnersDto: GetWinnersDto,
    @Res() res?: Response,
  ) {
    const winners = await this.winnersService.getWinners(getWinnersDto);

    res.set('X-Total-Count', `${this.winnersService.winners.length}`);

    res.end(JSON.stringify(winners));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get winner by id',
  })
  @ApiOkResponse({
    type: [WinnerEntity],
    description: 'OK',
  })
  @ApiNotFoundResponse({
    schema: { type: 'object' },
    description: 'NOT FOUND',
  })
  async getWinner(@Param('id', new ParseIntPipe()) id: number) {
    const winner = await this.winnersService.getWinner(id);
    if (winner) return winner;

    throw new HttpException('Winner not found', HttpStatus.NOT_FOUND);
  }

  @Post()
  @ApiOperation({
    summary: 'Create winner',
  })
  @ApiCreatedResponse({
    type: [WinnerEntity],
    description: 'CREATED',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error: Insert failed, duplicate id',
  })
  @Header('Content-Type', 'application/json')
  async createWinner(@Body() createWinnerDto: CreateWinnerDto) {
    const winner = await this.winnersService.getWinner(createWinnerDto.id);
    if (!winner) return this.winnersService.createWinner(createWinnerDto);

    throw new HttpException(
      'Error: Insert failed, duplicate id',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update winner by id',
  })
  @ApiOkResponse({
    type: [WinnerEntity],
    description: 'OK',
  })
  @ApiNotFoundResponse({
    schema: { type: 'object' },
    description: 'NOT FOUND',
  })
  @Header('Content-Type', 'application/json')
  async updateWinner(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateWinnerDto: UpdateWinnerDto,
  ) {
    const winner = await this.winnersService.getWinner(id);
    if (winner) return this.winnersService.updateWinner(id, updateWinnerDto);

    throw new HttpException('Winner not found', HttpStatus.NOT_FOUND);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete winner by id',
  })
  @ApiOkResponse({ schema: { type: 'object' }, description: 'OK' })
  @ApiNotFoundResponse({
    schema: { type: 'object' },
    description: 'NOT FOUND',
  })
  async deleteWinner(@Param('id', new ParseIntPipe()) id: number) {
    const winner = await this.winnersService.getWinner(id);
    if (winner) return this.winnersService.deleteWinner(id);

    throw new HttpException('Winner not found', HttpStatus.NOT_FOUND);
  }
}
