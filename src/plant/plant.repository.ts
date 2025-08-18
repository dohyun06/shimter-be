import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { Log } from '@prisma/client';
import { PlantDto, PlantIdDto } from './dto/plant.dto';

@Injectable()
export class PlantRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createPlant(): Promise<PlantIdDto> {
    return await this.prisma.plant.create({}).catch((error) => {
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
}
