import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PostService } from './post.service';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PostListDto, PostListQueryDto } from './dto/postList.dto';
import { PostDto, PostIdDto } from './dto/post.dto';
import { CreatePostDto } from './dto/createPost.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({
    summary: 'Get list of post',
    description: 'Get list of post using cursor and take',
  })
  @ApiOkResponse({
    type: PostListDto,
    description: 'Return information of a post',
  })
  @ApiNotFoundResponse({ description: 'Post id is Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getPostList(@Query() query: PostListQueryDto): Promise<PostListDto> {
    return await this.postService.getPostList(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get post',
    description: 'Get post using id of post',
  })
  @ApiParam({ name: 'id', type: String, description: 'Id of a post' })
  @ApiOkResponse({
    type: PostDto,
    description: 'Return information of a post',
  })
  @ApiNotFoundResponse({ description: ' Post id is Not Found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getPost(@Param() { id }: PostIdDto): Promise<PostDto> {
    return await this.postService.getPost(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create Post',
    description: 'Create post',
  })
  @ApiBody({ type: CreatePostDto })
  @ApiOkResponse({
    type: PostDto,
    description: 'Return information of a created post',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Exception' })
  @ApiNotFoundResponse({ description: 'User id is not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async createPost(@Body() postDto: CreatePostDto): Promise<PostDto> {
    return await this.postService.createPost(postDto);
  }
}
