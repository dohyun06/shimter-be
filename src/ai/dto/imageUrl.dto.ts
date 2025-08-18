import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class ImageUrlDto {
  @IsUrl()
  @ApiProperty({ example: 'https://.../image.jpg' })
  readonly url: string;
}
