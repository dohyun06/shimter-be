import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post, Prisma, User } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);
  constructor(private readonly prisma: PrismaService) {}

  async createUser(user: CreateUserDto): Promise<User> {
    return await this.prisma.user
      .create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          phoneNumber: user.phoneNumber,
          deviceId: user.deviceId,
        },
      })
      .catch((error) => {
        this.logger.error(error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('Database Error');
        }
        throw new InternalServerErrorException('Internal Server Error');
      });
  }

  async login(email: string): Promise<User> {
    return await this.prisma.user
      .findUniqueOrThrow({
        where: { email: email },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025')
            throw new NotFoundException('User id is not found');
          throw new InternalServerErrorException('Database error');
        }
        throw new InternalServerErrorException('Internal server error');
      });
  }

  async findUser(id: string): Promise<User> {
    return await this.prisma.user
      .findUniqueOrThrow({
        where: { id: id },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2025')
            throw new NotFoundException('User id is not found');
          throw new InternalServerErrorException('Database error');
        }
        throw new InternalServerErrorException('Internal server error');
      });
  }
}
