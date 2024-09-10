import mongoose from 'mongoose';
import { ReuniaoMentoriaDto } from '../dto/reuniao-mentoria.dto';
import { EnumStatusMentoria } from '../enums/mentorias-status';

export interface MentoriaInterface {
  idMentor: mongoose.Types.ObjectId;
  idMentorado: mongoose.Types.ObjectId;
  reuniao: ReuniaoMentoriaDto[];
  status: EnumStatusMentoria;
  materialAnexado: string[];
  feedback: string;
  descricao: string;
  nome: string;
}
