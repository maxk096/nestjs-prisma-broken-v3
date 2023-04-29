import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/rejectOnNotFound')
  rejectOnNotFound() {
    return this.appService.rejectOnNotFound();
  }

  @Get('/badRequestException')
  badRequestException() {
    throw new BadRequestException('Bad Request');
  }
}
