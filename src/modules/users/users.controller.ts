import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

const errorNotFound = (error, id) => {
  throw new HttpException({
    status: HttpStatus.NOT_FOUND,
    message: `User #${id} not found`,
  }, HttpStatus.NOT_FOUND, {
    cause: error
  });
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user: User = await this.usersService.findOne(+id);
      if (!user) throw new NotFoundException();
      return user;
    } catch (error) { 
      errorNotFound(error, id);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user: User = await this.usersService.findOne(+id);
      if (user) {
        await this.usersService.remove(+id);
        return {
          status: HttpStatus.OK,
          message: `User ${user.username} successfully removed.`
        }
      }
      throw new NotFoundException();
    } catch (error) { 
      errorNotFound(error, id);
    }
  }
}
