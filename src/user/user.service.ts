import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto, UserIdDto } from './dto/user.dto';
import { UserRepository } from './user.repository';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './token.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<UserDto> {
    const user = await this.userRepository.createUser(dto);
    return await this.findUser(user.id);
  }

  async login({ email, password }: LoginDto): Promise<TokenDto> {
    const user = await this.userRepository.findUser(email);

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Password is failed');

    const payload: UserIdDto = { id: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1d',
    });

    return { accessToken: accessToken };
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
