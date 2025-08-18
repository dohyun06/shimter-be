import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsString } from 'class-validator';
import { DiseaseLogDto, LogDto } from 'src/plant/dto/log.dto';

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
