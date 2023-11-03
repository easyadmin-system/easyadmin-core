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

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  readonly firstName: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  readonly lastName: string;
}
