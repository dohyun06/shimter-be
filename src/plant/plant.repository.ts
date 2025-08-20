import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { DiseaseLog, Log, Plant } from '@prisma/client';
import { PlantDto, PlantIdDto } from './dto/plant.dto';
import { CreateDiseaseLogDto } from './dto/log.dto';
import { PlantListQueryDto } from './dto/plantList.dto';

@Injectable()
export class PlantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getPlantList({
    skip,
    take,
  }: PlantListQueryDto): Promise<(Plant & { logs; diseaseLogs })[]> {
    return await this.prisma.plant.findMany({
      skip: skip,
      take: take,
      include: {
        logs: true,
        diseaseLogs: true,
      },
    });
  }

  async createPlant(): Promise<PlantIdDto> {
    return await this.prisma.plant
      .create({
        data: {},
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('Database Error');
        }
        throw new InternalServerErrorException('Internal Server Error');
      });
  }

  async getPlant(id: string): Promise<PlantDto> {
    return await this.prisma.plant
      .findUniqueOrThrow({
        where: { id: id },
        include: {
          logs: true,
          diseaseLogs: true,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2025') {
            throw new NotFoundException('Post id is not found');
          }
          throw new InternalServerErrorException('Database Error');
        }
        throw new InternalServerErrorException('Internal Server Error');
      });
  }

  async createLog(id: string, description: string): Promise<Log> {
    return await this.prisma.log
      .create({
        data: {
          description: description,
          plantId: id,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('Database Error');
        }
        throw new InternalServerErrorException('Internal Server Error');
      });
  }

  async createDiseaseLog(
    id: string,
    dto: CreateDiseaseLogDto,
  ): Promise<DiseaseLog> {
    return await this.prisma.diseaseLog
      .create({
        data: {
          description: dto.description,
          disease: dto.disease,
          plantId: id,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('Database Error');
        }
        throw new InternalServerErrorException('Internal Server Error');
      });
  }

  async getCount(): Promise<number> {
    return await this.prisma.plant.count();
  }
}
