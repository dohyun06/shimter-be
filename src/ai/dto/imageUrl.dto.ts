import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ImageUrlDto {
  @IsString()
  @ApiProperty({ example: 'https://.../image.jpg' })
  readonly url: string;
}
