import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ImageUrlDto } from './dto/imageUrl.dto';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  @ApiOperation({
    summary: 'Create Post',
    description: 'Create post',
  })
  @ApiBody({ type: ImageUrlDto })
  @ApiOkResponse({
    type: 'any',
    description: 'Return information of a created post',
  })
  @ApiNotFoundResponse({ description: 'image is not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getAiResult(@Body() imageUrl: ImageUrlDto): Promise<any> {
    return await this.aiService.getAiResult(imageUrl);
  }
}
