import { LoginUserDto } from './login-user.dto';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto extends LoginUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(60)
  readonly username: string;

  @MaxLength(50)
  readonly firstName: string;

  @MaxLength(50)
  readonly lastName: string;
}
