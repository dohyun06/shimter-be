import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AiService } from './ai.service';
import { ResultDto } from './dto/result.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  @ApiOperation({
    summary: 'Ai prediction',
    description: 'Ai prediction about image',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    type: ResultDto,
    description: 'Return ai prediction',
  })
  @ApiNotFoundResponse({ description: 'image is not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  @UseInterceptors(FileInterceptor('file'))
  async getAiResult(
    @UploadedFile() image: Express.Multer.File,
  ): Promise<ResultDto> {
    return await this.aiService.getAiResult(image.buffer);
  }
}
