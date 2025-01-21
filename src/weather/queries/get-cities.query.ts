import { Query } from '@nestjs/cqrs';
import { WeatherDto } from '../dtos/weather.dto';

export class GetCitiesQuery extends Query<Array<WeatherDto>> {
  constructor(public readonly cityNames: string[]) {
    super();
  }
}
