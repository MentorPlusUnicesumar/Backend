import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bycript from 'bcrypt';
import { LoginPayload } from 'src/auth/dto/login-payload.dto';
import { UserDocument } from 'src/users/schema/user.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { ChangePasswordDto } from './dto/change-password.dto';
import mongoose from 'mongoose';
import { EnumTypeUser } from 'src/users/enums/user-type';
import { MentorService } from 'src/mentor/mentor.service';
import { AlunoService } from 'src/aluno/aluno.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private mentorService: MentorService,
    private alunoService: AlunoService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async signIn(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (user.status === 'Aprovado') {
      const isMath = await bycript.compare(loginDto.senha, user.senha);

      if (!user || !isMath) {
        throw new NotFoundException('Email ou senha invalidos');
      }

      return this.gerarToken(user);
    } else {
      throw new UnauthorizedException('Usuário não aprovado');
    }
  }

  async refreshToken(body: { refresh_token: string }) {
    const payload = await this.validarRefresh(body);
    return this.gerarToken(payload);
  }

  private async gerarToken(user: UserDocument) {
    let userData: any;
    // console.log(user)
    if (user.typeUser == EnumTypeUser.Mentor) {
      userData = await this.mentorService.findByIdUser(user._id);
      console.log('userData:', userData);
    } else if (user.typeUser == EnumTypeUser.Aluno) {
      userData = await this.alunoService.findByIdUser(user._id);
      console.log('userData:', userData);
    }
    return {
      _id: userData._id,
      idUser: userData.idUser._id,
      typeUser: userData.idUser.typeUser,
      access_token: this.jwtService.sign({ ...new LoginPayload(userData) }),
      refresh_token: this.jwtService.sign(
        { ...new LoginPayload(userData) },
        {
          secret: process.env.REFRESH_CONSTANTS_JWT,
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        },
      ),
    };
  }

  private async validarRefresh(body: { refresh_token: string }) {
    const refreshToken = body.refresh_token;
    if (!refreshToken) {
      throw new NotFoundException('Usuário não encontrado');
    }
    const email = this.jwtService.decode(refreshToken)['email'];
    const usuario = await this.usersService.findByEmail(email);
    try {
      this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_CONSTANTS_JWT,
      });
      return usuario;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Assinatura Inválida');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expirado');
      }
      throw new UnauthorizedException(err.name);
    }
  }

  async sendRecoverPasswordEmail(email: string): Promise<void> {
    const user = await this.usersService.findByEmail(email);

    if (!user)
      throw new NotFoundException('Não há usuário cadastrado com esse email.');

    if (user.status === 'Aprovado') {
      const access_token = this.jwtService.sign(
        { ...new LoginPayload(user) },
        {
          secret: process.env.RESEND_CONSTANTS_JWT,
          expiresIn: process.env.RESEND_TOKEN_EXPIRES_IN,
        },
      );

      const mail = {
        to: user.email,
        subject: 'Recuperação de senha',
        template: 'recover-password',
        context: {
          token: access_token,
        },
      };
      await this.mailerService.sendMail(mail);
    } else {
      throw new UnauthorizedException('Usuário não aprovado');
    }
  }

  async changePassword(
    id: mongoose.Types.ObjectId,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { senha, confirmasenha } = changePasswordDto;

    if (senha != confirmasenha)
      throw new UnprocessableEntityException('As senhas não conferem');

    await this.usersService.changePassword(id, changePasswordDto);
  }

  async resetPassword(
    recoverToken: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const id = await this.jwtService.decode(recoverToken)['_id'];
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException('Token inválido.');

    if (user.status === 'Aprovado') {
      try {
        await this.changePassword(user.id, changePasswordDto);
      } catch (error) {
        throw error;
      }
    } else {
      throw new UnauthorizedException('Usuário não aprovado');
    }
  }
}
