import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';
//下载文件2种方式
@Controller('download')
export class DownloadController {
    @Get()//链接下载
    getDownload(@Res() res: Response) {
        res.download('uploads/back-1730816021501-919021993.jpg', (err) => {
            if (err) {
                console.log(err);
            }
            return
        });

    }
    @Get('stream')//流式下载
    getStream() {
        const stream = createReadStream(join(process.cwd(), 'uploads', 'back-1730816021501-919021993.jpg'));
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
        });//返回流
    }
}
