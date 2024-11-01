import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
const secret = process.env.SECRET_KEY; //从环境变量中获取密钥
// 目前没有登录，通过创建用户来模拟获取token
import * as jwt from 'jsonwebtoken';
//prisma所以的操作都是异步

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { } //依赖注入
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    console.log(secret, '123');

    return {
      token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' }),
      user, //返回token和用户信息
    }
  }

  findAll() {
    return this.prisma.user.findMany({
      include: {
        posts: true
      }
    });
  }
  // 查单个用户
  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      }
    })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id: id,
      },//更新条件
      data: updateUserDto,//更新数据
    })
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id: id,
      }
    })
  }
}
