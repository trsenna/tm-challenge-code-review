import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Injectable,
} from '@nestjs/common';
import { WeatherService } from './weather.service';

@Injectable()
@Controller('weather')
export class WeatherController {
  constructor(
    @Inject(WeatherService)
    private readonly service: WeatherService,
  ) {}

  @Get('/city')
  @HttpCode(201)
  async createAccessToken(@Body() city: string): Promise<any> {
    return await this.service.getCity(city);
  }

  @Get('/cities')
  @HttpCode(201)
  async getCities(@Body() city: string): Promise<any> {
    return await this.service.getCities(city);
  }

  @Get('/average')
  @HttpCode(201)
  async getAverage(@Body() city: string): Promise<any> {
    const response = await this.service.getCity(city);
    return `${(response.max_temp + response.min_temp) / 2}`;
  }
}
