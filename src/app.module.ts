import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module'; //引入用户模块
import { PostModule } from './post/post.module'; //引入帖子模块
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './upload/upload.module';
import { DownloadModule } from './download/download.module';

// @Module 前端叫装饰器 后端叫注解
// 装饰器有四种：类装饰器、属性装饰器、方法装饰器、参数装饰器
// 装饰器可以用来修改类、属性、方法、参数
// 修改class 在不修改class内部代码的情况下，增加功能
// 在编辑阶段就会执行，不会在运行阶段执行
@Module({
  imports: [UserModule, PostModule, PrismaModule, UploadModule, DownloadModule], // 启动模块，引入其他模块
  controllers: [AppController], // 路由
  providers: [AppService], // 逻辑层
})
export class AppModule {}
