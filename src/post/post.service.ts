import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { PostRepository } from './post.repository';
import { PostListQueryDto } from './dto/postList.dto';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getPostList(query: PostListQueryDto) {
    const posts = (await this.postRepository.getPostList(query)).map((post) => {
      return {
        id: post.id,
        title: post.title,
        content: post.content,
      };
    });
    const total = await this.postRepository.getCount();
    return { posts: posts, total: total };
  }

  async getPost(id: string): Promise<PostDto> {
    const post = await this.postRepository.getPost(id);
    return {
      id: post.id,
      title: post.title,
      content: post.content,
    };
  }

  async createPost(postDto: CreatePostDto): Promise<PostDto> {
    const post = await this.postRepository.createPost(postDto);

    return this.getPost(post.id);
  }
}
