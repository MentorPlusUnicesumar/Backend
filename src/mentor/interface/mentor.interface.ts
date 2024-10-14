import { TrabDestaqueDto } from '../dto/trab-destaque.dto';
import mongoose from 'mongoose';

export interface MentorInterface {
  idUser: mongoose.Types.ObjectId;
  sobre: string;
  competencias: string[];
  experiencias: string[];
  trabDestaque: TrabDestaqueDto[];
  instagram: string;
  youtube: string;
  linkedin: string;
  areaDeEnsino: mongoose.Types.ObjectId[];
  disponivel: boolean;
  estrela: number[];
}
