import { ApiProperty } from "@nestjs/swagger";

// 对象管理层 用来做验证比如名字是不是必填的
export class CreateUserDto {
  @ApiProperty({ example: "张三", description: "用户名" })//swagger文档的描述
  name: string;
  @ApiProperty({ example: "123456@qq.com", description: "邮箱" })
  email: string;
}
