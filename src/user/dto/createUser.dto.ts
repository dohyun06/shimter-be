import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: '홍길동' })
  readonly name: string;

  @IsString()
  @ApiProperty({ example: 'abcde@gm.gist.ac.kr' })
  readonly email: string;

  @IsString()
  @ApiProperty({ example: 'abcde' })
  readonly password: string;

  @IsString()
  @ApiProperty({ example: '010-0000-0000' })
  readonly phoneNumber: string;

  @IsString()
  @ApiProperty({ example: 'AA-100' })
  readonly deviceId: string;
}
