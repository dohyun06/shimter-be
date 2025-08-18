import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto, UserIdDto } from './dto/user.dto';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './token.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('join')
  @ApiOperation({ summary: 'create a user' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async join(@Body() dto: CreateUserDto): Promise<UserDto> {
    return await this.userService.createUser(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'login' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async login(@Body() dto: LoginDto): Promise<TokenDto> {
    return await this.userService.login(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user', description: 'Get user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Id of a user' })
  @ApiOkResponse({ type: UserDto, description: 'Return user information' })
  @ApiNotFoundResponse({ description: 'User Not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async findUser(@Param() { id }: UserIdDto): Promise<UserDto> {
    return this.userService.findUser(id);
  }
}
