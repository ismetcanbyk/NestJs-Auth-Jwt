import { Controller, Get, Post, Req } from '@nestjs/common';
import { Prisma, User as UserEntity } from '@prisma/client';
import { AuthService } from '@auth';
import { AllowUnauthorizedRequest } from '@shared';
import { User } from '@shared';
import { UserService } from '@database/modules';

@Controller('auth')
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @AllowUnauthorizedRequest()
  async create(@Req() req: Request): Promise<UserEntity> {
    return this.authService.reqister(req.body as any as Prisma.UserCreateInput);
  }

  @Post('login')
  @AllowUnauthorizedRequest()
  async login(@Req() req: Request) {
    return this.authService.login(req.body as any);
  }

  @Get('me')
  async getUser(@User() user: UserEntity) {
    return this.userService.findOne({ id: user.id });
  }
}
