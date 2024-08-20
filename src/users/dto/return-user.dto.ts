import { EstadoUF } from '../enums/enum-uf';
import { EnumStatusUser } from '../enums/user-status';
import { EnumTypeUser } from '../enums/user-type';
import { UserDocument } from '../schema/user.schema';

export class UserReturnInterface {
  name: string;
  email: string;
  telefone: string;
  typeUser: EnumTypeUser;
  status: EnumStatusUser;
  cidade: string;
  uf: EstadoUF;
  cpf: string;
  mentoriasAtivas: string[];
  fotos: string;

  constructor(user: UserDocument) {
    this.name = user.name;
    this.email = user.email;
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
