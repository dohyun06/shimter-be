import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/createPost.dto';
import { PostListQueryDto } from './dto/postList.dto';
import { Post } from 'generated/prisma';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getPostList({ skip, take }: PostListQueryDto): Promise<Post[]> {
    return await this.prisma.post.findMany({
      skip: skip,
      take: take,
      orderBy: { createdAt: 'asc' },
    });
  }

  async getPost(id: string): Promise<Post> {
    return await this.prisma.post
      .findUniqueOrThrow({
        where: { id: id },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            throw new NotFoundException('Post id is not found');
          }
          throw new InternalServerErrorException('Database Error');
        }
        throw new InternalServerErrorException('Internal Server Error');
      });
  }

  async createPost(post: CreatePostDto): Promise<Post> {
    return await this.prisma.post
      .create({
        data: {
          title: post.title,
          content: post.content,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('Database Error');
        }
        throw new InternalServerErrorException('Internal Server Error');
      });
  }

  async getCount(): Promise<number> {
    return await this.prisma.post.count();
  }
}
