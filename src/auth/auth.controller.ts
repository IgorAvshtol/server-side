import {
  Controller,
  Post,
  UseGuards,
  Req,
  Res,
  Get,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const userData = await this.authService.login(req.user);
    const { token, ...responseUserData } = userData;
    // const token = userData.token;
    const secretData = {
      token,
      refreshToken: '',
    };
    await res.cookie('auth-cookie', secretData, { httpOnly: true });
    await res.cookie('userId', responseUserData.id, { httpOnly: true });
    return responseUserData;
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async loginOut(@Res() res: Response) {
    await res.cookie('auth-cookie', 'logout', { httpOnly: true });
    await res.cookie('userId', 'none', { httpOnly: true });
    return res.json({ message: 'logout' });
  }

  @Post('register')
  async register(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userData = await this.authService.register(dto);
    const { token, ...responseUserData } = userData;
    // const token = userData.token;
    const secretData = {
      token,
      refreshToken: '',
    };
    res.cookie('auth-cookie', secretData, { httpOnly: true });
    res.cookie('userId', responseUserData.id, { httpOnly: true });
    return responseUserData;
  }

  // @Post('register')
  // async register(@Body() dto: CreateUserDto) {
  //   return this.authService.register(dto);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    return req.user;
  }
}
