import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@database/modules';
import { validatePassword } from './utils/validation';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async reqister({ email, password }) {
    const user = await this.userService.findOne({ email });
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const newUser = await this.userService.create({
      email,
      password,
    });
    return newUser;
  }

  async login({ email, password }) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload);

    return { user, accessToken };
  }
}
