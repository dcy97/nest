import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// nestJs 他是基于Angular的 rxjs promise expressjs fastifyjs 组合而成
// nestJs 是一个渐进式的框架，可以渐进式引入
// 默认用的是expressjs 可以用fastifyjs

async function server() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); //设置全局路由前缀
  app.enableVersioning({
    type: VersioningType.URI, //设置版本控制方式 体现在路径上
    defaultVersion: '1', //设置默认版本
  }); //开启版本控制
  app.enableCors(); //开启跨域
  const options = new DocumentBuilder()
    .setTitle('NestJS API文档') //设置文档标题
    .setDescription('NestJS API 描述') //设置文档描述
    .setVersion('1.0') //设置文档版本 
    // .addBearerAuth() //验证token
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document); //设置文档路由
  await app.listen(process.env.PORT ?? 3000); //启动服务
}
server();
