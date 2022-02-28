import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto) {
    const existingEmail = await this.repository.findOne({ email: dto.email });
    if (!existingEmail) {
      return await this.repository.save(dto);
    }
    return 'Пользователь с данным email уже зарегистрирован';
  }

  findAll() {
    return this.repository.find();
  }

  async findById(id: number) {
    return this.repository.findOne(id);
  }

  // async findByCond(cond: LoginUserDto) {
  //   return this.repository.findOne(cond);
  // }

  async findByCond(email: string) {
    return await this.repository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return await this.repository.delete(id);
  }
}
