import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { WeatherDto } from 'src/weather/dtos/weather.dto';
import { firstValueFrom } from 'rxjs';
import { AverageQuery } from '../average.query';
import { WeatherService } from 'src/weather/services/weather.service';

@QueryHandler(AverageQuery)
export class AverageHandler implements IQueryHandler<AverageQuery> {
  private readonly weatherApiKey: string;
  private readonly weatherApiUrl: string;
  private readonly headers: Record<string, string>;

  constructor(
    private readonly weatherService: WeatherService,
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

  async execute(query: AverageQuery) {
    const response = await firstValueFrom(
      this.httpService.get<WeatherDto>(
        `${this.weatherApiUrl}?city=${query.cityName}`,
        {
          headers: this.headers,
        },
      ),
    );

    return this.weatherService.calculateAverage(
      response.data ? response.data[0] || null : null,
    );
  }
}
