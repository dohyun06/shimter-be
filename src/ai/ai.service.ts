import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ImageUrlDto } from './dto/imageUrl.dto';
import path from 'path';
import { spawn } from 'child_process';
import * as fs from 'fs';
import { v4 } from 'uuid';
import axios from 'axios';

@Injectable()
export class AiService {
  async getAiResult({ url }: ImageUrlDto): Promise<any> {
    let tempFilePath: string = '';
    try {
      // 1. URL에서 이미지 다운로드
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
      });
      const imageBuffer = Buffer.from(response.data, 'binary');

      // 2. 이미지를 임시 파일로 저장
      const tempDir = path.resolve(__dirname, './temp');
      if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
      const tempFileName = `${v4()}.jpg`;
      tempFilePath = path.join(tempDir, tempFileName);
      fs.writeFileSync(tempFilePath, imageBuffer);

      // 3. Python 자식 프로세스 실행
      return await new Promise((resolve, reject) => {
        const pythonScriptPath = path.resolve(__dirname, './python/ai.py');
        const pythonProcess = spawn('python', [pythonScriptPath, tempFilePath]);

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
    } finally {
      // 4. 예측 완료 후 임시 파일 삭제
      if (tempFilePath && fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }
  }
}
