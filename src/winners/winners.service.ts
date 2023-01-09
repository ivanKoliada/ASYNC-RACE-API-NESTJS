import { Injectable } from '@nestjs/common';
import { CreateWinnerDto, UpdateWinnerDto } from './winners.dto';
import { WinnerEntity } from './winners.entity';

@Injectable()
export class WinnersService {
  private winners: WinnerEntity[] = [
    {
      id: 1,
      wins: 1,
      time: 10,
    },
    {
      id: 2,
      wins: 3,
      time: 7,
    },
  ];

  async getWinners(): Promise<WinnerEntity[]> {
    return await this.winners;
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
    const index = this.winners.findIndex((winner) => winner.id === id);

    const updatedWinner = {
      ...updateWinnerDto,
      id,
    };

    this.winners[index] = updatedWinner;

    return updatedWinner;
  }

  async deleteWinner(id: number) {
    this.winners = this.winners.filter((winner) => winner.id !== id);
  }
}
