import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomerUseCase } from '../base/customer/useCase/customer.usecase';
import { Customer } from '../base/customer/entity/customer.entity';

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
    const payload = {
      id: user.id,
      username: user.username,
      sub: user.id,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}