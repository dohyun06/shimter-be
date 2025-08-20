import { Injectable } from '@nestjs/common';
import { PlantDto, PlantIdDto } from './dto/plant.dto';
import { PlantRepository } from './plant.repository';
import { CreateDiseaseLogDto, CreateLogDto } from 'src/plant/dto/log.dto';
import { PlantListQueryDto } from './dto/plantList.dto';

@Injectable()
export class PlantService {
  constructor(private readonly plantRepository: PlantRepository) {}

  async getPlantList(query: PlantListQueryDto) {
    const plants = (await this.plantRepository.getPlantList(query)).map(
      (plant) => {
        return {
          id: plant.id,
          logs: plant.logs,
          diseaseLogs: plant.diseaseLogs,
        };
      },
    );
    const total = await this.plantRepository.getCount();
    return { plants: plants, total: total };
  }

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

  async createDiseaseLog(
    id: string,
    dto: CreateDiseaseLogDto,
  ): Promise<PlantDto> {
    await this.plantRepository.createDiseaseLog(id, dto);
    return await this.getPlant(id);
  }

  async changeStatus(id: string): Promise<PlantDto> {
    const diseaseLog = await this.plantRepository.changeStatus(id);
    return await this.getPlant(diseaseLog.plantId);
  }
}
