import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AverageQuery } from '../average.query';
import { WeatherService } from 'src/weather/services/weather.service';

@QueryHandler(AverageQuery)
export class AverageHandler implements IQueryHandler<AverageQuery> {
  constructor(private readonly weatherService: WeatherService) {}

  async execute(query: AverageQuery) {
    return this.weatherService.calculateAverage(
      await this.weatherService.getWeatherData(query.cityName),
    );
  }
}
