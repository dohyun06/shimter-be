import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { PostDto } from './post.dto';
import { Type } from 'class-transformer';

export class PostListDto {
  @IsArray()
  @ApiProperty({ type: [PostDto] })
  posts: PostDto[];

  @IsNumber()
  @ApiProperty({ example: 1 })
  total: number;
}

export class PostListQueryDto {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ example: 1 })
  readonly skip: number;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ example: 3 })
  readonly take: number;
}
