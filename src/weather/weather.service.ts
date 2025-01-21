import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { WeatherResponseData } from './weather.response.data';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { QueryBus } from '@nestjs/cqrs';
import { GetCityQuery } from './queries/get-city.query';

@Injectable()
export class WeatherService {
  constructor(
    private queryBus: QueryBus,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getCity(cityName: string): Promise<WeatherResponseData> {
    return this.queryBus.execute(new GetCityQuery(cityName));
  }

  async getCities(cities: string[]): Promise<Array<WeatherResponseData>> {
    return await Promise.all(
      cities.map(async (city: string) => this.callOneByCity(city)),
    );
  }

  async getAverage(city: any): Promise<string> {
    const weatherResponse = await this.callOneByCity(city);
    return `${(weatherResponse.max_temp + weatherResponse.min_temp) / 2}`;
  }

  async callOneByCity(city: string): Promise<WeatherResponseData> {
    const weatherApiKey = this.configService.get<string>('WEATHER_API_KEY');
    const weatherApiUrl = this.configService.get<string>('WEATHER_API_URL');

    const headers = {
      'X-Api-Key': weatherApiKey,
      'Content-Type': 'application/json',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get<WeatherResponseData>(
          `${weatherApiUrl}?city=${city}`,
          { headers },
        ),
      );

      return response.data ? response.data[0] || null : null;
    } catch (error) {
      console.error(
        `Error fetching data for city: ${city}`,
        error.response?.data || error,
      );

      throw new InternalServerErrorException(
        `Failed to fetch data for city: ${city}`,
      );
    }
  }
}
