import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Render,
  Inject,
  Res,
} from '@nestjs/common';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { LocalAuthGuard } from '../local/local-auth.guard';
import { AuthUseCase } from '../usecase/auth.usecase';

/* Auth Controller manage the routes for authentication */
@Controller()
export class AuthController {
  @Inject(AuthUseCase)
  private authUseCase: AuthUseCase;

  /* istanbul ignore next */
  @Get('auth/login')
  @Render('login')
  async loginPage() {
    return;
  }
  /* istanbul ignore next */
  @Get('auth/signup')
  @Render('signup')
  async signUpPage() {
    return;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const login = await this.authUseCase.login(req.user);
    res.cookie('team_galaxy_access_token', login.access_token);
    res.cookie('customerId', login.id);
    res.cookie('username', login.username);
    res.cookie('email', login.email);
    res.cookie('address', login.address);
    res.cookie('phoneNumber', login.phoneNumber);
    return login;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('logout')
  @Render('logout')
  async logout() {
    return {
      message: 'Disconnection...',
    };
  }
}
