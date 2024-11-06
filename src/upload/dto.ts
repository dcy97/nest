import { ApiProperty } from '@nestjs/swagger'
export class UploadDto {
    @ApiProperty({ description: '上传文件', type: 'string', format: 'binary' })
    file: Express.Multer.File;
}