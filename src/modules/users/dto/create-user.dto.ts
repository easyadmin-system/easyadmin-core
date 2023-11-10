import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(60)
  readonly username: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  readonly password: string;

  @MaxLength(50)
  readonly firstName: string;

  @MaxLength(50)
  readonly lastName: string;
}
