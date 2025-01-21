import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCitiesQuery } from '../get-cities.query';
import { WeatherService } from 'src/weather/services/weather.service';

@QueryHandler(GetCitiesQuery)
export class GetCitiesHandler implements IQueryHandler<GetCitiesQuery> {
  constructor(private readonly weatherService: WeatherService) {}

  async execute(query: GetCitiesQuery) {
    return await Promise.all(
      query.cityNames.map(async (cityName: string) => {
        return this.weatherService.getWeatherData(cityName);
      }),
    );
  }
}
