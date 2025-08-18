import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { AiModule } from './ai/ai.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostModule,
    AiModule,
    PrismaModule,
    UserModule,
  ],
})
export class AppModule {}
