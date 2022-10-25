import { Controller, Get, Request, Post, UseGuards, Render, Body, Inject, Redirect } from "@nestjs/common";
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { LocalAuthGuard } from './local/local-auth.guard';
import { AuthUseCase } from './auth.usecase';

/* Auth Controller manage the routes for authentication */
@Controller()
export class AuthApi {
  @Inject(AuthUseCase)
  private authUseCase: AuthUseCase

  @Get('auth/login')
  @Render('login')
  async loginPage() {
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log("Connexion ...")
    return this.authUseCase.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
