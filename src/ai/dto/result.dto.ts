import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResultDto {
  @IsString()
  @ApiProperty({ example: 'normal' })
  readonly class: string;

  @IsString()
  @ApiProperty({ example: '100%' })
  readonly confidence;
}
