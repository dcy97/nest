import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
const secret = process.env.SECRET_KEY;
//守卫的意思 权限控制
@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //获取请求头信息
    const headers = context.switchToHttp().getRequest().headers;
    console.log(headers, 'headers');
    // //判断请求头中是否有authorization字段
    // if (headers.authorization) {
    //   return true;
    // } else {
    //   return false;
    // }
    return new Promise((resolve, reject) => {
      console.log(secret, 'secret');

      jwt.verify(headers.authorization, secret, (err, decoded) => {
        if (err) {
          reject(new ForbiddenException('权限不足'));
        } else {
          resolve(true);
        }
      })
    })
  }
}
