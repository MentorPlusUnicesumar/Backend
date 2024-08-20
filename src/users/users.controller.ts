import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorator/auth.decorator';
import { EnumTypeUser } from './enums/user-type';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserInterface } from './interface/user.interface';
import { UserReturnInterface } from './dto/return-user.dto';
import { UserId } from './decorator/user-id.dto';
import { NewSenhaUserDto } from './dto/newsenha-user.dto';
import mongoose from 'mongoose';


@Controller('users')
@Roles(EnumTypeUser.Admin)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  private create(@Body() createUserDto: CreateUserDto): Promise<UserInterface | {}>  {
    try {
      return this.usersService.create(createUserDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Erro ao cadastrar o usuario',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get('name')
  @Roles(EnumTypeUser.Admin)
  private findByName(@Body('name') name: string) {
    try {
      return this.usersService.findByName(name);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Erro ao buscar pelo nome',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get('email')
  @Roles(EnumTypeUser.Admin)
  private findByEmail(@Body('email') email: string) {
    try {
      return this.usersService.findByEmail(email);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Erro ao buscar pelo email',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get()
  @Roles(EnumTypeUser.Admin)
  private async findAll(): Promise<UserReturnInterface | {}> {
    try {
      return (await this.usersService.findAll()).map(
        (userInterface) => new UserReturnInterface(userInterface)
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Erro ao buscar todos os alunos',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get('id/:id')
  @Roles(EnumTypeUser.Admin)
  private findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @Roles(EnumTypeUser.Admin)
  private update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Erro ao atualizar o usuario',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Delete(':id')
  @Roles(EnumTypeUser.Admin)
  private remove(@Param('id') id: string) {
    try {
      return this.usersService.remove(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Erro ao deletar o usuario',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Post('password')
  @Public()
  private redefinirSenha (@UserId() id: mongoose.Types.ObjectId, @Body() newSenhaUserDto) {
    try {
      return this.usersService.resetPassword(id, newSenhaUserDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Erro ao redefinir senha do usuario',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
