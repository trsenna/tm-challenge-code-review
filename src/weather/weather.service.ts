import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetCityQuery } from './queries/get-city.query';
import { GetCitiesQuery } from './queries/get-cities.query';
import { AverageQuery } from './queries/average.query';
import { WeatherDto } from './dtos/weather.dto';

@Injectable()
export class WeatherService {
  constructor(private queryBus: QueryBus) {}

  async getCity(cityName: string): Promise<WeatherDto> {
    return this.queryBus.execute(new GetCityQuery(cityName));
  }

  async getCities(cityNames: string[]): Promise<Array<WeatherDto>> {
    return this.queryBus.execute(new GetCitiesQuery(cityNames));
  }

  async average(cityName: string): Promise<number> {
    return this.queryBus.execute(new AverageQuery(cityName));
  }
}
