import { Injectable } from '@nestjs/common';
import { CreateCarDto, UpdateCarDto } from './garage.dto';
import { CarEntity } from './garage.entity';

@Injectable()
export class GarageService {
  private cars: CarEntity[] = [
    {
      name: 'Tesla',
      color: '#e6e6fa',
      id: 1,
    },
    {
      name: 'BMW',
      color: '#fede00',
      id: 2,
    },
    {
      name: 'Mersedes',
      color: '#6c779f',
      id: 3,
    },
    {
      name: 'Ford',
      color: '#ef3c40',
      id: 4,
    },
  ];

  async getCars(): Promise<CarEntity[]> {
    return await this.cars;
  }

  async getCar(id: number): Promise<CarEntity> {
    const car = await this.cars.find((car) => car.id === +id);
    if (car) return car;

    return null;
  }

  async createCar(createCarDto: CreateCarDto): Promise<CarEntity> {
    const id = this.cars.at(-1).id + 1;
    const car = {
      ...createCarDto,
      id,
    };

    await this.cars.push(car);

    return car;
  }

  async updateCar(id: number, updateCarDto: UpdateCarDto): Promise<CarEntity> {
    const index = this.cars.findIndex((car) => car.id === +id);

    const updatedCar = {
      ...updateCarDto,
      id,
    };

    this.cars[index] = updatedCar;

    return updatedCar;
  }

  async deleteCar(id: number) {
    this.cars = await this.cars.filter((car) => car.id !== +id);
  }
}
