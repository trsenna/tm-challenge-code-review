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
  @HttpCode(200)
  async getCity(@Body() data: any): Promise<any> {
    return await this.service.getCity(data.city);
  }

  @Get('/cities')
  @HttpCode(200)
  async getCities(@Body() data: any): Promise<any> {
    return await this.service.getCities(data.cities);
  }

  @Get('/average')
  @HttpCode(200)
  async getAverage(@Body() data: any): Promise<any> {
    return await this.service.getAverage(data.city);
  }
}
