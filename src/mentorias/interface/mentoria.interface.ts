import mongoose from 'mongoose';
import { EnumStatusMentoria } from '../enums/mentorias-status';

export interface MentoriaInterface {
  nome: string;
  idMentor: mongoose.Types.ObjectId;
  idAluno: mongoose.Types.ObjectId;
  reuniao: mongoose.Types.ObjectId[];
  status: EnumStatusMentoria;
  materialAnexado: string[];
  feedback: string;
  qtdtotal: number;
  descricao: string;
}
