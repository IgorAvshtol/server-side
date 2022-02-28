import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/entities/user.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByCond(email);
    const decryptPassword = await bcrypt.compare(password, user.password);
    if (user && decryptPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateJwtToken(data: { id: number; email: string }) {
    const payload = { email: data.email, id: data.id };
    return this.jwtService.sign(payload);
  }

  async login(user: UserEntity) {
    const { password, ...userData } = user;
    return {
      ...userData,
      token: this.generateJwtToken(userData),
    };
  }

  async register(dto: CreateUserDto) {
    // const hashPassword = await bcrypt.hash(dto.password, 5);
    // const dataUser = { ...dto, password: hashPassword };
    try {
      const { password, ...user } = await this.usersService.create(dto);
      return {
        ...user,
        token: this.generateJwtToken(user),
      };
    } catch (e) {
      throw new ForbiddenException('Ошибка при регистрации');
    }
  }
}
