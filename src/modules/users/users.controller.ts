import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const errorNotFound = (error, str) => {
  throw new HttpException({
    statusCode: HttpStatus.NOT_FOUND,
    message: `User ${str} not found`,
  }, HttpStatus.NOT_FOUND, {
    cause: error
  });
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      let user: User = await this.usersService.findByUsername(createUserDto.username);
      if (user) throw new ConflictException();
      user = await this.usersService.create(createUserDto);

      return {
        statusCode: HttpStatus.CREATED,
        message: `User ${user.username} successfully created`
      }
    } catch (error) { 
      throw new HttpException({
        statusCode: HttpStatus.CONFLICT,
        message: `User ${createUserDto.username} already exists`,
      }, HttpStatus.CONFLICT, {
        cause: error
      });
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/id/:id')
  async findById(@Param('id') id: string) {
    try {
      const user: User = await this.usersService.findById(+id);
      if (!user) throw new NotFoundException();
      return user;
    } catch (error) { 
      errorNotFound(error, id);
    }
  }

  @Get(':username')
  async findByUsername(@Param('username') username: string) {
    try {
      const user: User = await this.usersService.findByUsername(username);
      if (!user) throw new NotFoundException();
      return user;
    } catch (error) { 
      errorNotFound(error, username);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user: User = await this.usersService.findById(+id);
      if (user) {
        await this.usersService.remove(+id);
        return {
          statusCode: HttpStatus.OK,
          message: `User ${user.username} successfully removed.`
        }
      }
      throw new NotFoundException();
    } catch (error) { 
      errorNotFound(error, id);
    }
  }
}
