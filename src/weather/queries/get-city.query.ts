import { Query } from '@nestjs/cqrs';
import { WeatherDto } from '../dtos/weather.dto';

export class GetCityQuery extends Query<WeatherDto> {
  constructor(public readonly cityName: string) {
    super();
  }
}
