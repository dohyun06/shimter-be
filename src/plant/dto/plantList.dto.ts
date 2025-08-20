import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { PlantDto } from './plant.dto';

export class PlantListDto {
  @IsArray()
  @ApiProperty({ type: [PlantDto] })
  plants: PlantDto[];

  @IsNumber()
  @ApiProperty({ example: 1 })
  total: number;
}

export class PlantListQueryDto {
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ example: 1 })
  readonly skip: number;

  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ example: 3 })
  readonly take: number;
}
