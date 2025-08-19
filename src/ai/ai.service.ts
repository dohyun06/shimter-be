import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ImageUrlDto } from './dto/imageUrl.dto';
import path from 'path';
import { spawn } from 'child_process';
import * as fs from 'fs';
import { v4 } from 'uuid';
import axios from 'axios';
import { ResultDto } from './dto/result.dto';

@Injectable()
export class AiService {
  async getAiResult({ url }: ImageUrlDto): Promise<ResultDto> {
    let tempFilePath: string = path.join(
      path.resolve(__dirname, './img'),
      'test.jpg',
    );
    try {
      /*
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
      });
      const imageBuffer = Buffer.from(response.data, 'binary');

      const tempDir = path.resolve(__dirname, './temp');
      if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
      const tempFileName = `${v4()}.jpg`;
      tempFilePath = path.join(tempDir, tempFileName);
      fs.writeFileSync(tempFilePath, imageBuffer);
      */

      return await new Promise((resolve, reject) => {
        const pythonScriptPath = path.resolve(__dirname, './python/ai.py');
        const pythonProcess = spawn('python3', [
          pythonScriptPath,
          tempFilePath,
        ]);

        let result = '';
        let errorResult = '';

        pythonProcess.stdout.on('data', (data) => (result += data.toString()));
        pythonProcess.stderr.on(
          'data',
          (data) => (errorResult += data.toString()),
        );

        pythonProcess.on('close', (code) => {
          if (code === 0) {
            resolve(JSON.parse(result));
          } else {
            reject(
              new Error(
                `Python 스크립트 오류: ${errorResult || `종료 코드 ${code}`}`,
              ),
            );
          }
        });
      });
    } catch (error) {
      console.error('PredictionService Error:', error);
      throw new HttpException(
        'AI 예측 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
