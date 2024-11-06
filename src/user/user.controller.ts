import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseUUIDPipe
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserGuard } from './user.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('用户模块')//给swagger接口文档添加标签
// @Controller() 里面就是路由的名字 空的就是/
@Controller({
  version: "1",
  path: "user",
})
// 导出UserController类
export class UserController {
  // 构造函数，注入UserService
  constructor(private readonly userService: UserService) { }

  // 创建用户，使用Post请求，参数为CreateUserDto类型
  @Post()
  @ApiOperation({ summary: '创建用户', description: '创建用户' })//给swagger接口文档添加描述
  create(@Body() createUserDto: CreateUserDto) {
    // 调用userService的create方法，返回创建的用户
    return this.userService.create(createUserDto);
  }

  // 使用守卫，使用Get请求，返回所有用户
  @UseGuards(UserGuard)// 使用守卫
  @Get()
  customFindAll() {
    // 调用userService的findAll方法，返回所有用户
    return this.userService.findAll();
  }

  // 使用Get请求，根据id返回用户
  @Get(':id')
  // ParseUUIDPipe是nestjs提供的一个管道，用于将字符串转换为UUID类型 
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    // 调用userService的findOne方法，根据id返回用户
    return this.userService.findOne(id);
  }

  // 使用Patch请求，根据id更新用户
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // 调用userService的update方法，根据id更新用户
    return this.userService.update(id, updateUserDto);
  }

  // 使用Delete请求，根据id删除用户
  @Delete(':id')
  remove(@Param('id') id: string) {
    // 调用userService的remove方法，根据id删除用户
    return this.userService.remove(id);
  }
}
