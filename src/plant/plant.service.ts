import { Injectable } from '@nestjs/common';
import { PlantDto, PlantIdDto } from './dto/plant.dto';
import { PlantRepository } from './plant.repository';
import { CreateLogDto } from 'src/plant/dto/log.dto';

@Injectable()
export class PlantService {
  constructor(private readonly plantRepository: PlantRepository) {}

  async createPlant(): Promise<PlantIdDto> {
    return await this.plantRepository.createPlant();
  }

  async getPlant(id: string): Promise<PlantDto> {
    return await this.plantRepository.getPlant(id);
  }

  async createLog(
    id: string,
    { description }: CreateLogDto,
  ): Promise<PlantDto> {
    await this.plantRepository.createLog(id, description);
    return await this.getPlant(id);
  }
}
