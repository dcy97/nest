import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';// multer模块
import { diskStorage } from 'multer'; // 文件存储模块
import { ServeStaticModule } from '@nestjs/serve-static';// 静态文件模块

@Module({
  imports: [MulterModule.register({
    storage: diskStorage({
      destination: 'uploads', // 文件存储路径
      filename: (req, file, cb) => {// 存放文件名称并且自定义文件名
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) // 生成随机数;
        const ext = file.mimetype.split('/')[1];// 获取文件后缀名
        //mimetype:文件类型
        cb(null, file.originalname + '-' + uniqueSuffix + '.' + ext);
      }
    }),
  }), ServeStaticModule.forRoot({
    rootPath: 'uploads', // 静态文件路径 底层就是express.static sendFile
  })
  ],
  controllers: [UploadController]
})
export class UploadModule { }
