import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './token.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const user = await this.userRepository.createUser(dto);
    return await this.findUser(user.id);
  }

  async login({ email, password }: LoginDto): Promise<TokenDto> {
    const user = await this.userRepository.findUser(email);
    return { access_token: 'token' };
  }

  async findUser(id: string): Promise<UserDto> {
    const user = await this.userRepository.findUser(id);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      deviceId: user.deviceId,
    };
  }
}
