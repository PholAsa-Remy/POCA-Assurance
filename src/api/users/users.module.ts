import { Module } from '@nestjs/common';
import { UsersUsecase } from './users.usecase';

@Module({
  providers: [UsersUsecase],
  exports: [UsersUsecase],
})
export class UsersModule {}