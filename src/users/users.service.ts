import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserInterface } from './interface/user.interface';
import { NewSenhaUserDto } from './dto/newsenha-user.dto';
import { ChangePasswordDto } from 'src/auth/dto/change-password.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private mailerService: MailerService,
  ) {}

  private async userHash(pass: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(pass, saltOrRounds);
    return hash;
  }

  async create(createUserDto: CreateUserDto) {
    const validEmail = await this.findByEmail(createUserDto.email);
    const validCpf = await this.findByCpf(createUserDto.cpf);
    const erros = {
      error: [],
    };
    if (validEmail) {
      erros.error.push(`O email: ${createUserDto.email} ja foi cadastrado`);
    }
    if (validCpf) {
      erros.error.push(`O CPF: ${createUserDto.cpf} ja foi cadastrado`);
    }
    if (validCpf || validEmail) {
      return erros.error;
    } else {
      createUserDto.senha = await this.userHash(createUserDto.senha);
      const user = new this.userModel(createUserDto);
      const adminsEmail = (await this.findEmailAdmins()).map(
        (admin) => admin.email,
      );

      if (adminsEmail.length) {
        const mail = {
          to: adminsEmail,
          subject: 'Novo usuário cadastrado',
          template: 'new-user',
        };
        await this.mailerService.sendMail(mail);
      }

      return user.save();
    }
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email }).exec();
  }

  findEmailAdmins() {
    return this.userModel
      .find({ typeUser: 'Admin', status: 'Aprovado' })
      .select('email -_id')
      .exec();
  }

  findByCpf(cpf: string) {
    return this.userModel.findOne({ cpf: cpf }).exec();
  }

  findAll() {
    return this.userModel.find();
  }

  findById(id: string | mongoose.Types.ObjectId) {
    return this.userModel.findById(id);
  }

  findByName(name: string) {
    return this.userModel.findOne({ name: name }).exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserInterface> {
    if (updateUserDto.senha) {
      updateUserDto.senha = await this.userHash(updateUserDto.senha);
    }
    return this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateUserDto },
      { new: true },
    );
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id });
  }

  async resetPassword(
    id: mongoose.Types.ObjectId,
    newSenhaUserDto: NewSenhaUserDto,
  ) {
    const user = await this.findById(id);
    console.log(user);
    console.log(newSenhaUserDto);
    const isMath = await bcrypt.compare(newSenhaUserDto.senha, user.senha);
    console.log(isMath);
    if (isMath) {
      if (newSenhaUserDto.novasenha == newSenhaUserDto.confirmasenha) {
        newSenhaUserDto.novasenha = await this.userHash(
          newSenhaUserDto.novasenha,
        );
        await this.userModel.findByIdAndUpdate(
          { _id: id },
          { $set: { senha: newSenhaUserDto.novasenha } },
          { new: true },
        );
        return {
          result: 'Senha alterada com sucesso',
        };
      } else {
        return {
          result: 'As senhas não conferem',
        };
      }
    } else {
      return {
        result: 'Senha atual incorreta',
      };
    }
  }

  async changePassword(
    id: mongoose.Types.ObjectId,
    changePasswordDto: ChangePasswordDto,
  ) {
    if (changePasswordDto.senha == changePasswordDto.confirmasenha) {
      changePasswordDto.senha = await this.userHash(changePasswordDto.senha);
      await this.userModel.findByIdAndUpdate(
        { _id: id },
        { $set: { senha: changePasswordDto.senha } },
        { new: true },
      );
      return {
        result: 'Senha alterada com sucesso',
      };
    } else {
      return {
        result: 'As senhas não conferem',
      };
    }
  }
}
