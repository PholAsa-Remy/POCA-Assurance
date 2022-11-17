import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entity/customer.entity';
import {
  CreateCustomerCommand,
  UpdateCustomerCommand,
} from '../command/customer.command';

@Injectable()
export class CustomerUseCase {
  @InjectRepository(Customer)
  private readonly repository: Repository<Customer>;

  async findOneById(id: string): Promise<Customer> {
    return await this.repository.findOneBy({
      id,
    });
  }

  async findOneByName(username: string): Promise<Customer> {
    return await this.repository.findOneBy({
      username,
    });
  }

  async findByEmail(email: string): Promise<Customer> {
    return await this.repository.findOneBy({
      email,
    });
  }

  async findAll(): Promise<Customer[]> {
    return await this.repository.find();
  }

  async create(body: CreateCustomerCommand): Promise<Customer> {
    const user: Customer = new Customer();

    user.username = body.username;
    user.password = body.password;
    user.address = body.address;
    user.email = body.email;
    user.phoneNumber = body.phoneNumber;

    return await this.repository.save(user);
  }

  async update(
    body: UpdateCustomerCommand,
    customerId: string,
  ): Promise<Customer> {
    await this.repository
      .createQueryBuilder()
      .update(Customer)
      .set({
        username: body.username,
        password: body.password,
        email: body.email,
        address: body.address,
        phoneNumber: body.phoneNumber,
      })
      .where('id = :id', { id: customerId })
      .execute();

    return await this.repository.findOne({
      where: {
        id: customerId,
      },
    });
  }
}
