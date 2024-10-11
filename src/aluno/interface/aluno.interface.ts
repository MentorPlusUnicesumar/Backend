import mongoose from 'mongoose';

export interface AlunoInterface {
  idUser: mongoose.Types.ObjectId;
  areasInteresse: mongoose.Types.ObjectId[];
}
