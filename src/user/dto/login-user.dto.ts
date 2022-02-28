import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail(undefined, { message: 'Неверная почта' })
  @IsNotEmpty()
  email: string;
  @Length(6, 32, { message: 'Неверная длина пароля' })
  @IsNotEmpty()
  password: string;
}
