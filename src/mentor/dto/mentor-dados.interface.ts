import mongoose from 'mongoose';
import { TrabDestaqueDto } from './trab-destaque.dto';
import { CreateMentorDto } from './create-mentor.dto';

export class MentorDadosInterface {
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

  constructor(mentor: CreateMentorDto) {
    this.sobre = mentor.sobre;
    this.competencias = mentor.competencias;
    this.experiencias = mentor.experiencias;
    this.trabDestaque = mentor.trabDestaque;
    this.instagram = mentor.instagram;
    this.youtube = mentor.youtube;
    this.linkedin = mentor.linkedin;
    this.areaDeEnsino = mentor.areaDeEnsino;
    this.disponivel = mentor.disponivel;
    this.estrela = mentor.estrela;
  }
}
