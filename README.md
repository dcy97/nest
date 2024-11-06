### theme

nuxtjs nextjs nestjs 能做SRR也能做server

nuxtjs 是Vue的SRR框架

nextjs 是React的SRR框架

nestjs 是node服务器框架

nestjs是mvc框架，而nuxtjs和nextjs是spa框架，
所以nestjs是后端框架，而nuxtjs和nextjs是前端框架

### $schema

为json文件添加schema，可以验证json文件的格式是否正确，提供代码提示等功能

### 安装nestjs

````sh
npm install -g @nestjs/cli
```sh

### nest g --help

    | name          │ alias       │ description                                  │
    │ application   │ application │ Generate a new application workspace         │
    │ class         │ cl          │ Generate a new class                         │
    │ configuration │ config      │ Generate a CLI configuration file            │
    │ controller    │ co          │ Generate a controller declaration            │
    │ decorator     │ d           │ Generate a custom decorator                  │
    │ filter        │ f           │ Generate a filter declaration                │
    │ gateway       │ ga          │ Generate a gateway declaration               │
    │ guard         │ gu          │ Generate a guard declaration                 │
    │ interceptor   │ itc         │ Generate an interceptor declaration          │
    │ interface     │ itf         │ Generate an interface                        │
    │ library       │ lib         │ Generate a new library within a monorepo     │
    │ middleware    │ mi          │ Generate a middleware declaration            │
    │ module        │ mo          │ Generate a module declaration                │
    │ pipe          │ pi          │ Generate a pipe declaration                  │
    │ provider      │ pr          │ Generate a provider declaration              │
    │ resolver      │ r           │ Generate a GraphQL resolver declaration      │
    │ resource      │ res         │ Generate a new CRUD resource                 │
    │ service       │ s           │ Generate a service declaration               │
    │ sub-app       │ app         │ Generate a new application within a monorepo

### nest项目结构

````

    │
    │ nest-cli.json
    │ package.json
    │ README.md
    │ src
    │ │ app
    │ │ │ app.controller.spec.ts
    │ │ │ app.controller.ts //控制器层
    │ │ │ app.module.ts //模块层
    │ │ │ app.service.spec.ts //单元测试
    │ │ │ app.service.ts //服务层
    │ │ │ main.ts //入口文件
    │ │ │ user
    │ │ │ │ dto //对象管理层 用来做验证比如名字是不是必填的
    │ │ │ │ entities //实体层 创建数据表的,用来做数据库映射
    │ │ │ │user.controller.spec.ts
    │ │ │ |user.controller.ts
    │ │ │ |user.module.ts
    │ │ │ |user.service.spec.ts
    │ │ │ |user.service.ts

````

### 安装prisma

```sh
npm i prisma --save-dev
````

初始化prisma

```sh
npx prisma init
```

成功后多出一个prisma文件夹和.env文件

### 数据库迁移

```sh
npx prisma migrate dev --name init
```

### 创建一个prisma service

```sh
nest g s prisma
```

### 文件上传

上传文件类型为multipart/form-data
分割符为boundary

设置文件上传位置为uoploads
但是前端直接访问uploads文件夹下的文件会报错
需要安装一个包

```sh
npm i @nestjs/serve-static
```

#### upload.controller

```ts
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadDto } from './dto';

@Controller('upload')
export class UploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file')) //file是前端传过来的文件名,定义上传的key
  @ApiConsumes('multipart/form-data') //告诉swagger这个接口是上传文件的接口
  @ApiBody({
    type: UploadDto,
  }) //告诉swagger这个接口的请求体是UploadDto类型
  // ParseFilePipe 是对上传的文件进行校验
  uploadFile(@UploadedFile(ParseFilePipe) file: Express.Multer.File) {
    //uploadFile 名字任意 Express.Multer.File是上传的文件类型
    //处理上传文件的逻辑
    return file;
  }
}
```

#### upload.module

```ts
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express'; // multer模块
import { diskStorage } from 'multer'; // 文件存储模块
import { ServeStaticModule } from '@nestjs/serve-static'; // 静态文件模块

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: 'uploads', // 文件存储路径
        filename: (req, file, cb) => {
          // 存放文件名称并且自定义文件名
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9); // 生成随机数;
          const ext = file.mimetype.split('/')[1]; // 获取文件后缀名
          //mimetype:文件类型
          cb(null, file.originalname + '-' + uniqueSuffix + '.' + ext);
        },
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: 'uploads', // 静态文件路径 底层就是express.static sendFile
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
```

#### upload.dto

```ts
export class UploadDto {
  @ApiProperty({ type: 'string', format: 'binary' }) //告诉swagger这个字段是上传的文件
  file: Express.Multer.File;
}
```

### 文件下载

#### download.controller

```ts
import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

//下载文件2种方式
@Controller('download')
export class DownloadController {
  @Get() //链接下载
  getDownload(@Res() res: Response) {
    res.download('uploads/back-1730816021501-919021993.jpg', (err) => {
      if (err) {
        console.log(err);
      }
      return;
    });
  }
  @Get('stream') //流式下载
  getStream() {
    const stream = createReadStream(
      join(process.cwd(), 'uploads', 'back-1730816021501-919021993.jpg'),
    );
    return new StreamableFile(stream, {
      type: 'image/jpg',
      //application/octet-stream 返回二进制流
      //application/json 返回json
      //text/plain 返回文本
      //iamge/png 返回图片
      //application/pdf 返回pdf
      //text/javascript 返回js
      //disposition attachment表示下载，filename表示下载的文件名
      disposition: 'attachment; filename=back-1730816021501-919021993.jpg',
    }); //返回流
  }
}
```

#### download.module

```ts
import { Module } from '@nestjs/common';
import { DownloadController } from './download.controller';

@Module({
  controllers: [DownloadController],
})
export class DownloadModule {}
```

### swagger

swagger是nestjs的官方插件，用于生成接口文档，使用步骤如下：

```sh
npm i @nestjs/swagger
```
