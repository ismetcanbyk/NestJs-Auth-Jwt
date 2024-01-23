import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule, AuthService } from '@auth';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@guards/auth.guard';
import { DatabaseModule } from '@database';
import { UserModule } from '@database/modules';

@Module({
  imports: [AuthModule, DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
