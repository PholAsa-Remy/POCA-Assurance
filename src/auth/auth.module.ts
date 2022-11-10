import { Module } from '@nestjs/common';
import { AuthUseCase } from './usecase/auth.usecase';
import { LocalStrategy } from './local/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwt.constants';
import { CustomerModule } from '../base/customer/customer.module';

@Module({
  imports: [
    CustomerModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  providers: [AuthUseCase, LocalStrategy, JwtStrategy],
  exports: [AuthUseCase],
})
export class AuthModule {}
