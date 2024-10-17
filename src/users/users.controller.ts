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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EnumTypeUser } from './enums/user-type';
import { UserInterface } from './interface/user.interface';
import { UserReturnInterface } from './dto/return-user.dto';
import { UserId } from './decorator/user-id.dto';
import { NewSenhaUserDto } from './dto/newsenha-user.dto';
import mongoose from 'mongoose';
import { EnumStatusUser } from './enums/user-status';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { ValidateObjectIdPipe } from '../common/pipes/validate-object-id.pipe';
import { Public } from '../auth/decorator/auth.decorator';
import { Roles } from '../auth/decorator/roles.decorator';

@Controller('users')
@Roles([EnumTypeUser.Admin], [EnumStatusUser.APROVADO])
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserInterface | object> {
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
  findByName(@Body('name') name: string) {
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
  findByEmail(@Body('email') email: string) {
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
  async findAll(): Promise<UserReturnInterface | object> {
    try {
      return (await this.usersService.findAll()).map(
        (userInterface) => new UserReturnInterface(userInterface),
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
  findById(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
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
  remove(@Param('id', ValidateObjectIdPipe) id: mongoose.Types.ObjectId) {
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
  @Post('reset-password')
  @Roles(
    [EnumTypeUser.Admin, EnumTypeUser.Mentor, EnumTypeUser.Aluno],
    [EnumStatusUser.APROVADO],
  )
  redefinirSenha(
    @UserId() id: mongoose.Types.ObjectId,
    @Body() newSenhaUserDto: NewSenhaUserDto,
  ) {
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

  @Patch(':id/update-status')
  updateUserStatus(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() updateUserStatusDto: UpdateUserStatusDto,
  ) {
    try {
      return this.usersService.updateUserStatus(id, updateUserStatusDto.status);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Erro ao atualizar o status do usuário',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
