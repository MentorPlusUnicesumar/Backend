import mongoose from 'mongoose';

export interface CardMentoria {
  id: mongoose.Types.ObjectId;
  nome: string;
  proximoEncontro: string;
  nomeMentor: string;
  nomeMentorado: string;
}
