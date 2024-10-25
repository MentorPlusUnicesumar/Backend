import mongoose from 'mongoose';
import { EstadoUF } from '../enums/enum-uf';
import { EnumTypeUser } from '../enums/user-type';
import { CreateUserDto } from './create-user.dto';

export class AlunoDadosInterface {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  typeUser: EnumTypeUser;
  cidade: string;
  uf: EstadoUF;
  cpf: string;
  fotos: string;
  areas: mongoose.Types.ObjectId[];

  constructor(user: CreateUserDto) {
    this.nome = user.nome;
    this.email = user.email;
    this.senha = user.senha;
    this.telefone = user.telefone;
    this.typeUser = user.typeUser;
    this.cidade = user.cidade;
    this.uf = user.uf;
    this.cpf = user.cpf;
    this.fotos = user.fotos;
    this.areas = user.areas;
  }
}
