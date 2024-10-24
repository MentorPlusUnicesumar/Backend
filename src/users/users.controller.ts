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
import { Public } from 'src/auth/decorator/auth.decorator';
import { EnumTypeUser } from './enums/user-type';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { UserInterface } from './interface/user.interface';
import { UserReturnInterface } from './dto/return-user.dto';
import { NewSenhaUserDto } from './dto/newsenha-user.dto';
import mongoose from 'mongoose';
import { EnumStatusUser } from './enums/user-status';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { ValidateObjectIdPipe } from '../common/pipes/validate-object-id.pipe';
import { UserIdUser } from './decorator/user-idUser.dto';

@Controller('users')
@Roles([EnumTypeUser.Admin], [EnumStatusUser.APROVADO])
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  private create(
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
  // @Roles(EnumTypeUser.Admin)
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
  private async findAll(): Promise<UserReturnInterface | object> {
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
  private findById(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  private update(
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
  private remove(
    @Param('id', ValidateObjectIdPipe) id: mongoose.Types.ObjectId,
  ) {
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
  private redefinirSenha(
    @UserIdUser() id: mongoose.Types.ObjectId,
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
  private updateUserStatus(
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
