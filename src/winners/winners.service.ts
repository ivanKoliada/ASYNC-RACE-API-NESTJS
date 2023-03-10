import { Injectable } from '@nestjs/common';
import { CreateWinnerDto, GetWinnersDto, UpdateWinnerDto } from './winners.dto';
import { WinnerEntity } from './winners.entity';

@Injectable()
export class WinnersService {
  winners: WinnerEntity[] = [];

  async getWinners(getWinnersDto: GetWinnersDto): Promise<WinnerEntity[]> {
    const { _page = 1, _limit, _sort = 'id', _order = 'ASC' } = getWinnersDto;

    const winners = await this.winners.sort((a, b) => {
      if (_order === 'ASC') return a[_sort] - b[_sort];
      if (_order === 'DESC') return b[_sort] - a[_sort];
    });

    if (!_limit) {
      return winners;
    }

    return winners.slice((_page - 1) * _limit, _page * _limit);
  }

  async getWinner(id: number): Promise<WinnerEntity> {
    const winner = await this.winners.find((winner) => winner.id === +id);
    if (winner) return winner;

    return null;
  }

  async createWinner(createWinnerDto: CreateWinnerDto) {
    await this.winners.push(createWinnerDto);
    return createWinnerDto;
  }

  async updateWinner(id: number, updateWinnerDto: UpdateWinnerDto) {
    const index = this.winners.findIndex((winner) => winner.id === +id);

    const updatedWinner = {
      ...updateWinnerDto,
      id,
    };

    this.winners[index] = updatedWinner;

    return updatedWinner;
  }

  async deleteWinner(id: number) {
    this.winners = this.winners.filter((winner) => winner.id !== +id);
  }
}
