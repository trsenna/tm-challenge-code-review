import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCityQuery } from '../get-city.query';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { WeatherDto } from 'src/weather/dtos/weather.dto';
import { firstValueFrom } from 'rxjs';

@QueryHandler(GetCityQuery)
export class GetCityHandler implements IQueryHandler<GetCityQuery> {
  private readonly weatherApiKey: string;
  private readonly weatherApiUrl: string;
  private readonly headers: Record<string, string>;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.weatherApiKey = this.configService.get<string>('WEATHER_API_KEY');
    this.weatherApiUrl = this.configService.get<string>('WEATHER_API_URL');
    this.headers = {
      'X-Api-Key': this.weatherApiKey,
      'Content-Type': 'application/json',
    };
  }

  async execute(query: GetCityQuery) {
    const response = await firstValueFrom(
      this.httpService.get<WeatherDto>(
        `${this.weatherApiUrl}?city=${query.city}`,
        {
          headers: this.headers,
        },
      ),
    );

    return response.data ? response.data[0] || null : null;
  }
}
