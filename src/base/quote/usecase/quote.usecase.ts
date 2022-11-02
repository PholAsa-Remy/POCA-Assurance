import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuoteCommand } from '../command/quote.command';
import { Quote } from '../entity/quote.entity';

@Injectable()
export class QuoteUseCase {
  @InjectRepository(Quote)
  private readonly repository: Repository<Quote>;

  public async get(id: number): Promise<Quote> {
    return await this.repository.findOneBy({ id });
  }

  public async findAll(): Promise<Quote[]> {
    return await this.repository.find();
  }

  public async create(body: CreateQuoteCommand): Promise<Quote> {
    const quote: Quote = new Quote();

    quote.name = body.name;
    quote.email = body.email;
    quote.address = body.address;

    return await this.repository.save(quote);
  }
}
