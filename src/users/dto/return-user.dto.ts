import mongoose from 'mongoose';
import { EstadoUF } from '../enums/enum-uf';
import { EnumStatusUser } from '../enums/user-status';
import { EnumTypeUser } from '../enums/user-type';
import { UserDocument } from '../schema/user.schema';
import { TrabDestaqueDto } from './trab-destaque.dto';

export class UserReturnInterface {
  nome: string;
  email: string;
  telefone: string;
  typeUser: EnumTypeUser;
  status: EnumStatusUser;
  cidade: string;
  uf: EstadoUF;
  cpf: string;
  mentoriasAtivas: mongoose.Types.ObjectId[];
  fotos: string;
  areas: mongoose.Types.ObjectId[];
  sobre: string;
  competencias: string[];
  experiencias: string[];
  trabDestaque: TrabDestaqueDto[];
  instagram: string;
  youtube: string;
  linkedin: string;
  disponivel: boolean;
  estrela: number[];

  constructor(user: UserDocument) {
    this.nome = user.nome;
    this.email = user.email;
    this.telefone = user.telefone;
    this.typeUser = user.typeUser;
    this.status = user.status;
    this.cidade = user.cidade;
    this.uf = user.uf;
    this.cpf = user.cpf;
    this.mentoriasAtivas = user.mentoriasAtivas;
    this.fotos = user.fotos;
    this.areas = user.areas;
    this.sobre = user.sobre;
    this.competencias = user.competencias;
    this.experiencias = user.experiencias;
    this.trabDestaque = user.trabDestaque;
    this.instagram = user.instagram;
    this.youtube = user.youtube;
    this.linkedin = user.linkedin;
    this.disponivel = user.disponivel;
    this.estrela = user.estrela;
  }
}
