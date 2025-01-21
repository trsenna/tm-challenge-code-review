import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { GetCityHandler } from './queries/handlers/get-city.handler';

@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
  providers: [WeatherService, GetCityHandler],
})
export class WeatherModule {}
