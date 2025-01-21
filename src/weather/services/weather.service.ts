import { Injectable } from '@nestjs/common';
import { WeatherDto } from '../dtos/weather.dto';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WeatherService {
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

  async getWeatherData(cityName: string): Promise<WeatherDto | null> {
    const response = await firstValueFrom(
      this.httpService.get<WeatherDto>(
        `${this.weatherApiUrl}?city=${cityName}`,
        {
          headers: this.headers,
        },
      ),
    );
    return response.data ? response.data[0] || null : null;
  }

  calculateAverage(weather: WeatherDto): number {
    if (!weather) return 0;

    return (weather.max_temp + weather.min_temp) / 2;
  }
}
