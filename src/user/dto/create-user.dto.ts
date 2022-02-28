import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { UniqueOnDatabase } from '../../auth/validations/UniqueValidation';
import { UserEntity } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  fullName: string;
  @IsEmail(undefined, { message: 'Неверная почта' })
  @UniqueOnDatabase(UserEntity, {
    message: 'Пользователь с таким email уже зарегистрирован',
  })
  email: string;
  @Length(6, 32, { message: 'Неверная длина пароля' })
  password: string;
}
