import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './modules';

@Module({
  providers: [PrismaModule, UserModule],
  exports: [PrismaModule, UserModule],
  imports: [PrismaModule, UserModule],
})
export class DatabaseModule {}
