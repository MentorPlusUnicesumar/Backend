import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import mongoose, { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserInterface } from './interface/user.interface';
import { NewSenhaUserDto } from './dto/newsenha-user.dto';
import { ChangePasswordDto } from 'src/auth/dto/change-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { EnumStatusUser } from './enums/user-status';
import { FiltroUserDto } from './dto/filtro-user.dto';
import { EnumTypeUser } from './enums/user-type';
import { FiltroMentorDto } from './dto/filtro-mentor.dto';
import { filtroMentorType } from './interface/filtro-mentor.interface';

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
    // eslint-disable-next-line
    const { status, mentoriasAtivas, ...userData } = createUserDto;
    // let userResult = {}
    // if (createUserDto.typeUser == EnumTypeUser.Aluno) {
    //   userResult = new AlunoDadosInterface(createUserDto)
    // } else {
    //   const { status, mentoriasAtivas, ...userData } = createUserDto;

    // }

    const errors = [];
    if (validEmail) {
      errors.push(`O email: ${userData.email} ja foi cadastrado`);
    }
    if (validCpf) {
      errors.push(`O CPF: ${userData.cpf} ja foi cadastrado`);
    }
    if (validCpf || validEmail) {
      throw new BadRequestException(errors);
    } else {
      userData.senha = await this.userHash(userData.senha);
      const user = new this.userModel(userData);
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

      return (await user.save()).populate('mentoriasAtivas areas');
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
    return this.userModel
      .findOne({ cpf: cpf })
      .populate('mentoriasAtivas areas')
      .exec();
  }

  findAll() {
    return this.userModel.find().populate('mentoriasAtivas areas');
  }

  findById(id: string | Types.ObjectId) {
    return this.userModel
      .findById(id)
      .select('-senha')
      .populate('mentoriasAtivas areas');
  }

  findByName(nome: string) {
    return this.userModel.findOne({ nome: nome }).exec();
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

  remove(id: mongoose.Types.ObjectId) {
    return this.userModel.deleteOne({ _id: id });
  }

  async resetPassword(id: Types.ObjectId, newSenhaUserDto: NewSenhaUserDto) {
    const user = await this.findById(id);
    const isMath = await bcrypt.compare(newSenhaUserDto.senha, user.senha);
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
    id: Types.ObjectId,
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

  async addMentoriaAtiva(id: Types.ObjectId, idMentoria: Types.ObjectId) {
    return await this.userModel.findByIdAndUpdate(
      { _id: id },
      { $push: { mentoriasAtivas: idMentoria } },
      { new: true },
    );
  }

  async updateUserStatus(
    id: string,
    status: EnumStatusUser,
  ): Promise<UserInterface> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    user.status = status;

    return user.save();
  }

  async filtroUsers(filtroUserDto: FiltroUserDto): Promise<UserInterface[]> {
    const filtro: any = {};

    if (filtroUserDto.nome) {
      filtro.nome = { $regex: filtroUserDto.nome, $options: 'i' };
    }

    if (filtroUserDto.status) {
      filtro.status = filtroUserDto.status;
    }
    const users = await this.userModel.find(filtro).exec();

    if (!users || users.length === 0) {
      throw new NotFoundException('Usuário(s) não encontrado(s)');
    }

    return users;
  }

  async filtroMentores(
    filtroMentorDto: FiltroMentorDto,
  ): Promise<UserInterface[]> {
    // Passa os valores simples para o filtro
    const filtro: any = {};

    if (filtroMentorDto.nome) {
      filtro.nome = filtroMentorDto.nome;
    }

    if (filtroMentorDto.areas) {
      filtro.areas = filtroMentorDto.areas;
    }

    filtro.typeUser = EnumTypeUser.Mentor;

    // Executa a consulta com base no filtro
    const mentores = await this.userModel
      .find(filtro)
      .populate({
        path: 'areas',
        match: filtro.areadeinterese
          ? Array.isArray(filtro.areadeinterese)
            ? { nome: { $in: filtro.areadeinterese.map(String) } }
            : { nome: { $regex: filtro.areadeinterese, $options: 'i' } }
          : {},
      })
      .exec();

    // Lança exceção se nenhum mentor for encontrado
    if (!mentores || mentores.length === 0) {
      throw new NotFoundException('Nenhum mentor encontrado');
    }

    return mentores;
  }

  // async filtroMentor(filtro: any = {}) {
  //   return this.mentorModel
  //     .find({})
  //     .populate([
  //       {
  //         path: 'idUser',
  //         match: filtro.name
  //           ? { name: { $regex: filtro.name, $options: 'i' } }
  //           : {},
  //       },
  //       {
  //         path: 'areaDeEnsino',
  //         match: filtro.areadeinterese
  //           ? Array.isArray(filtro.areadeinterese)
  //             ? { nome: { $in: filtro.areadeinterese.map(String) } }
  //             : { nome: { $regex: filtro.areadeinterese, $options: 'i' } }
  //           : {},
  //       },
  //     ])
  //     .exec()
  //     .then((mentores) => mentores.filter((mentor) => mentor.idUser !== null));
  // }
  async findMentores(query: filtroMentorType) {
    const filtro: any = { typeUser: EnumTypeUser.Mentor, disponivel: true };

    if (query.nomeMentor) {
      filtro.nome = { $regex: query.nomeMentor, $options: 'i' };
    }

    let mentorias: any = await this.userModel
      .find(filtro)
      .populate('areas')
      .limit(10);

    if (query.areaMentor) {
      // verifica se query area mentor está dentro do array areas do mentor usando regex
      mentorias = mentorias.filter((mentor) =>
        mentor.areas.some((area) =>
          new RegExp(query.areaMentor, 'i').test(area.nome),
        ),
      );
    }

    // Implementar ordenação pelo match

    return mentorias;
  }
}
