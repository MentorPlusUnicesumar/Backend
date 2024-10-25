import mongoose from 'mongoose';
import { EstadoUF } from '../enums/enum-uf';
import { EnumStatusUser } from '../enums/user-status';
import { EnumTypeUser } from '../enums/user-type';
import { TrabDestaqueDto } from '../dto/trab-destaque.dto';

export interface UserInterface {
  nome: string;
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
}
