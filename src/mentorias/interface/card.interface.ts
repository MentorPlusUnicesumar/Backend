import mongoose from 'mongoose';

export interface CardMentoria {
  id: mongoose.Types.ObjectId;
  nome: string;
  proximoEncontro: Date;
  nomeMentor: string;
  nomeMentorado: string;
}
