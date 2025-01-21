import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCityQuery } from '../get-city.query';
import { WeatherService } from 'src/weather/services/weather.service';

@QueryHandler(GetCityQuery)
export class GetCityHandler implements IQueryHandler<GetCityQuery> {
  constructor(private readonly weatherService: WeatherService) {}

  async execute(query: GetCityQuery) {
    return this.weatherService.getWeatherData(query.cityName);
  }
}
