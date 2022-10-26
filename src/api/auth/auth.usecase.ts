import { Injectable } from '@nestjs/common';
import { CustomerUseCase } from '../customer/useCase/customer.usecase';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '../customer/entity/customer.entity';

/* Auth Service provide the operation for authentication */
@Injectable()
export class AuthUseCase {
  constructor(
    private usersService: CustomerUseCase,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<Customer> {
    const user = await this.usersService.findOneByName(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async login(user: Customer) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
