import { Module, Global } from '@nestjs/common';
// 引入prismaService
import { PrismaService } from './prisma.service';

@Global() // 标记为全局模块，以便在整个应用程序中使用
@Module({
  providers: [PrismaService], // 注册prismaService
  exports: [PrismaService], // 导出prismaService，以便其他模块使用
})
export class PrismaModule {}
