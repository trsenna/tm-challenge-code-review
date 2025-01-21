import { Body, Controller, Get, HttpCode, Injectable } from '@nestjs/common';
import { WeatherDto } from './dtos/weather.dto';
import { QueryBus } from '@nestjs/cqrs';
import { GetCityQuery } from './queries/get-city.query';
import { GetCitiesQuery } from './queries/get-cities.query';
import { AverageQuery } from './queries/average.query';

@Injectable()
@Controller('weather')
export class WeatherController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/city')
  @HttpCode(200)
  async getCity(@Body() data: { city: string }): Promise<WeatherDto> {
    return this.queryBus.execute(new GetCityQuery(data.city));
  }

  @Get('/cities')
  @HttpCode(200)
  async getCities(
    @Body() data: { cities: string[] },
  ): Promise<Array<WeatherDto>> {
    return this.queryBus.execute(new GetCitiesQuery(data.cities));
  }

  @Get('/average')
  @HttpCode(200)
  async average(@Body() data: { city: string }): Promise<number> {
    return this.queryBus.execute(new AverageQuery(data.city));
  }
}
