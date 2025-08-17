import { Injectable } from '@nestjs/common';
import { ImageUrlDto } from './dto/imageUrl.dto';

@Injectable()
export class AiService {
  async getAiResult({ url }: ImageUrlDto): Promise<any> {}
}
