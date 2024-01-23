import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule, UserService } from '@database/modules';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: async () => ({
        secret: process.env.AUTH_JWT_SECRET,
        signOptions: {
          expiresIn: process.env.AUTH_JWT_TOKEN_EXPIRES_IN,
        },
      }),
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
