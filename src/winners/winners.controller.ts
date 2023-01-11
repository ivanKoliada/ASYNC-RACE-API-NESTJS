import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateWinnerDto, GetWinnersDto, UpdateWinnerDto } from './winners.dto';
import { WinnersService } from './winners.service';

@Controller('winners')
export class WinnersController {
  constructor(private readonly winnersService: WinnersService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getWinners(
    @Query() getWinnersDto: GetWinnersDto,
    @Res() res?: Response,
  ) {
    const winners = await this.winnersService.getWinners(getWinnersDto);

    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
    res.set('X-Total-Count', `${winners.length}`);

    res.end(JSON.stringify(winners));
  }

  @Get(':id')
  async getWinner(@Param('id', new ParseIntPipe()) id: number) {
    const winner = await this.winnersService.getWinner(id);
    if (winner) return winner;

    throw new HttpException('Winner not found', HttpStatus.NOT_FOUND);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async createWinner(@Body() createWinnerDto: CreateWinnerDto) {
    return this.winnersService.createWinner(createWinnerDto);
  }

  @Put(':id')
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
  @HttpCode(204)
  async deleteWinner(@Param('id', new ParseIntPipe()) id: number) {
    const winner = await this.winnersService.getWinner(id);
    if (winner) return this.winnersService.deleteWinner(id);

    throw new HttpException('Winner not found', HttpStatus.NOT_FOUND);
  }
}
