import { Controller, Post, UploadedFile, UseInterceptors, ParseFilePipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadDto } from './dto';


@Controller('upload')
export class UploadController {
    @Post()
    @UseInterceptors(FileInterceptor('file'))//file是前端传过来的文件名,定义上传的key
    @ApiConsumes('multipart/form-data')//告诉swagger这个接口是上传文件的接口
    @ApiBody({
        type: UploadDto,
    })//告诉swagger这个接口的请求体是UploadDto类型
    // ParseFilePipe 是对上传的文件进行校验
    uploadFile(@UploadedFile(ParseFilePipe) file: Express.Multer.File) {//uploadFile 名字任意 Express.Multer.File是上传的文件类型
        //处理上传文件的逻辑
        return file
    }
}

// uploadFile(@UploadedFile() file: Express.Multer.File, @Body('userId') userId: string) {//uploadFile 名字任意 Express.Multer.File是上传的文件类型
//     //处理上传文件的逻辑
//     return file
// }
