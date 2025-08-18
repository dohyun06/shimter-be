import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { AiModule } from './ai/ai.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PlantModule } from './plant/plant.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostModule,
    AiModule,
    PrismaModule,
    UserModule,
    PlantModule,
  ],
})
export class AppModule {}
