import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsString } from 'class-validator';
import { LogDto } from 'src/plant/dto/log.dto';

class DiseaseLogDto {
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

export class PlantDto {
  @IsString()
  @ApiProperty({ example: '70025914-2097-4eb1-9ebb-c2181f02b4f3' })
  readonly id: string;

  @IsObject()
  @ApiProperty({ type: LogDto })
  readonly logs: LogDto[];

  @IsObject()
  @ApiProperty({ type: DiseaseLogDto })
  readonly diseaseLogs: LogDto[];
}

export class PlantIdDto {
  @IsString()
  @ApiProperty({ example: '70025914-2097-4eb1-9ebb-c2181f02b4f3' })
  readonly id: string;
}
