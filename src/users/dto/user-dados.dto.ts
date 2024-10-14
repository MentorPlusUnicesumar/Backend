import mongoose from 'mongoose';
import { EstadoUF } from '../enums/enum-uf';
import { EnumStatusUser } from '../enums/user-status';
import { EnumTypeUser } from '../enums/user-type';
import { CreateMentorDto } from 'src/mentor/dto/create-mentor.dto';
import { CreateAlunoDto } from 'src/aluno/dto/create-aluno.dto';

export class UserDadosInterface {
  name: string;
  email: string;
  senha: string;
  telefone: string;
  typeUser: EnumTypeUser;
  status: EnumStatusUser;
  cidade: string;
  uf: EstadoUF;
  cpf: string;
  mentoriasAtivas: mongoose.Types.ObjectId[];
  fotos: string;

  constructor(user: CreateMentorDto | CreateAlunoDto) {
    this.name = user.name;
    this.email = user.email;
    this.senha = user.senha;
    this.telefone = user.telefone;
    this.typeUser = user.typeUser;
    this.status = user.status;
    this.cidade = user.cidade;
    this.uf = user.uf;
    this.cpf = user.cpf;
    this.mentoriasAtivas = user.mentoriasAtivas;
    this.fotos = user.fotos;
  }
}
