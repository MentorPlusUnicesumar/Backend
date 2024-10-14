import mongoose from 'mongoose';
import { EnumStatusMentoria } from '../enums/mentorias-status';
import { CreateReuniaoDto } from 'src/reuniao/dto/create-reuniao.dto';

export interface ReuniaoMentoriaInterface {
  nome: string;
  idMentor: mongoose.Types.ObjectId;
  idAluno: mongoose.Types.ObjectId;
  reuniao: CreateReuniaoDto[];
  status: EnumStatusMentoria;
  materialAnexado: string[];
  feedback: string;
  descricao: string;
}
