import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

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
}

export class DiseaseLogDto {
  @IsString()
  @ApiProperty({ example: 'powdery' })
  readonly disease: string;

  @IsString()
  @ApiProperty({ example: 'description' })
  readonly description: string;

  @IsString()
  @ApiProperty({ example: '2000-01-01' })
  readonly createdAt: Date;

  @IsBoolean()
  @ApiProperty({ example: true })
  readonly overcome: boolean;
}

export class CreateDiseaseLogDto {
  @IsString()
  @ApiProperty({ example: 'powdery' })
  readonly disease: string;

  @IsString()
  @ApiProperty({ example: 'description' })
  readonly description: string;
}
