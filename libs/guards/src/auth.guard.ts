import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UserService } from '@database/modules';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allowUnauthorizedRequest = this.reflector.get<boolean>(
      'allowUnauthorizedRequest',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();

    return allowUnauthorizedRequest || this.validateRequest(request);
  }

  async validateRequest(req: Request): Promise<boolean> {
    const authorization = req.headers['authorization'];

    if (!authorization) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const decoded = await this.jwtService.verifyAsync(token);

    const user = await this.userService.findByEmail(decoded.email);

    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    if (decoded.exp < Date.now() / 1000) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return this.jwtService.verifyAsync(token).then(
      () => {
        delete user.password;
        req['user'] = user;
        return true;
      },
      () => {
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      },
    );
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
