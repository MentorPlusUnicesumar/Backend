import mongoose from 'mongoose';
import { CreateAlunoDto } from './create-aluno.dto';

export class AlunoDadosInterface {
  areasInteresse: mongoose.Types.ObjectId[];

  constructor(mentor: CreateAlunoDto) {
    this.areasInteresse = mentor.areasInteresse;
  }
}
