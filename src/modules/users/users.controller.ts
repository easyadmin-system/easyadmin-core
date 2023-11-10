import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, NotFoundException, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DtoHelperService } from './dto/dto-helper.service';
import { User } from './entities/user.entity';
import { UserI } from './users.interfaces';

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
  constructor(
    private readonly usersService: UsersService,
    private dtoHelperService: DtoHelperService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserI> {
    const userEntity: UserI = await this.dtoHelperService.createUserDtoToEntity(
      createUserDto,
    );
    return this.usersService.create(userEntity);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/id/:id')
  async findById(@Param('id') id: string) {
    try {
      const user: UserI = await this.usersService.getOneById(+id);
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
      const user: UserI = await this.usersService.getOneById(+id);
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
