import { Module } from '@nestjs/common';
import { AuthUseCase } from './auth.usecase';
import { LocalStrategy } from './local/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CustomerModule } from '../customer/customer.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/jwt.constants';

@Module({
  imports: [
    CustomerModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthUseCase, LocalStrategy, JwtStrategy],
  exports: [AuthUseCase],
})
export class AuthModule {}