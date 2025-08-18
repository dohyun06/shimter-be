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
import { ResultDto } from './dto/result.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  @ApiOperation({
    summary: 'Ai prediction',
    description: 'Ai prediction about image',
  })
  @ApiBody({ type: ImageUrlDto })
  @ApiOkResponse({
    type: 'any',
    description: 'Return ai prediction',
  })
  @ApiNotFoundResponse({ description: 'image is not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async getAiResult(@Body() imageUrl: ImageUrlDto): Promise<ResultDto> {
    return await this.aiService.getAiResult(imageUrl);
  }
}
