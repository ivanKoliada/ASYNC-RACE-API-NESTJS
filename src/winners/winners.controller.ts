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
} from '@nestjs/common';
import { CreateWinnerDto, UpdateWinnerDto } from './winners.dto';
import { WinnersService } from './winners.service';

@Controller('winners')
export class WinnersController {
  constructor(private readonly winnersService: WinnersService) {}

  @Get()
  async getWinners() {
    return await this.winnersService.getWinners();
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
