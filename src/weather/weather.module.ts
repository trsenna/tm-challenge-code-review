import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { GetCityHandler } from './queries/handlers/get-city.handler';
import { AverageHandler } from './queries/handlers/average.handler';
import { GetCitiesHandler } from './queries/handlers/get-cities.handler';

@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService, AverageHandler, GetCitiesHandler, GetCityHandler],
})
export class WeatherModule {}
