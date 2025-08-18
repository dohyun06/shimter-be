import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LogDto {
  @IsString()
  @ApiProperty({ example: 'description' })
  readonly description: string;

  @IsString()
  @ApiProperty({ example: '2000-01-01' })
  readonly createdAt: Date;
}

export class CreateLogDto {
  @IsString()
  @ApiProperty({ example: 'description' })
  readonly description: string;

  @IsString()
  @ApiProperty({ example: '2000-01-01' })
  readonly createdAt: Date;
}
