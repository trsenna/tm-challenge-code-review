import { Injectable } from '@nestjs/common';
import { WeatherDto } from '../dtos/weather.dto';

@Injectable()
export class WeatherService {
  calculateAverage(weather: WeatherDto): number {
    if (!weather) return 0;

    return (weather.max_temp + weather.min_temp) / 2;
  }
}
