import { Injectable } from '@nestjs/common';
import { User, UsersUsecase } from "../users/users.usecase";
import { JwtService } from '@nestjs/jwt';

/* Auth Service provide the operation for authentication */
@Injectable()
export class AuthUseCase {
  constructor(
    private usersService: UsersUsecase,
    private jwtService: JwtService
  ) {}


  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}