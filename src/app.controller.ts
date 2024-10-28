import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// @Controller() 里面就是路由的名字 空的就是/, @Controller('cats') 就是/cats
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() //get请求
  getHello(): string {
    return this.appService.getHello();
  }
}
