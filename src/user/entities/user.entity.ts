// 实体层 创建数据表的,用来做数据库映射 typeorm prisma
// orm框架
// select * from user where id = 1 sql语句 容易被sql注入
// orm框架 生成sql语句
// kenx('user').where({id:1}) ===> select * from user where id = 1
// 类似java的MyBatis  ORM框架
// import { Column, PrimaryGeneratedColumn } from "typeorm";
export class User {
  //     @PrimaryGeneratedColumn() // 主键 自增的id
  //     id: number;
  //     @Column()
  //     name: string;
  //     @Column()
  //     email: string;
}
