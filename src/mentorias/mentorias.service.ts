import { Injectable } from '@nestjs/common';
import { CreateMentoriaDto } from './dto/create-mentoria.dto';
// import { UpdateMentoriaDto } from './dto/update-mentoria.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Mentoria, MentoriaDocument } from './schema/mentoria.schema';
import mongoose, { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CardMentoria } from './interface/card.interface';
import { EnumStatusMentoria } from './enums/mentorias-status';

@Injectable()
export class MentoriasService {
  constructor(
    @InjectModel(Mentoria.name)
    private mentoriaModel: Model<MentoriaDocument>,
    private userService: UsersService,
  ) {}
  async create(createMentoriaDto: CreateMentoriaDto) {
    // eslint-disable-next-line
    const { reuniao, feedback, ...mentoriasData } = createMentoriaDto;
    const mentor = await this.userService.findById(createMentoriaDto.idMentor);
    const aluno = await this.userService.findById(createMentoriaDto.idAluno);
    const mentoria = new this.mentoriaModel(mentoriasData);
    if (mentor.typeUser == 'Mentor' && aluno.typeUser == 'Aluno') {
      return mentoria.save();
    } else if (mentor.typeUser != 'Mentor') {
      return { message: 'Somente Mentores podem criar uma mentoria' };
    } else if (aluno.typeUser != 'Aluno') {
      return { message: 'Mentoria é somente entre alunos e mentores' };
    }
  }

  private getDataProximoEncontro(mentoria): string {
    const dataAtual = new Date();
    const reunioes = mentoria.reuniao;
    let proximaData = 'Não definido';

    reunioes.sort((a, b) => a.diaReuniao.getTime() - b.diaReuniao.getTime());

    for (let i = 0; i < reunioes.length; i++) {
      if (reunioes[i].diaReuniao > dataAtual) {
        proximaData = reunioes[i].diaReuniao.toLocaleDateString('pt-BR');
        break;
      }
    }
    return proximaData;
  }

  async getCards(userId: mongoose.Types.ObjectId): Promise<CardMentoria[]> {
    const mentorias = await this.mentoriaModel.find({
      $or: [{ idMentor: userId }, { idAluno: userId }],
    });

    const cards = await Promise.all(
      mentorias.map(async (mentoria) => {
        return {
          id: mentoria._id,
          nome: mentoria.nome,
          proximoEncontro: this.getDataProximoEncontro(mentoria),
          nomeMentorado: (await this.userService.findById(mentoria.idAluno))
            .nome,
          nomeMentor: (await this.userService.findById(mentoria.idMentor)).nome,
        };
      }),
    );

    return cards;
  }

  async createReuniao(
    id: mongoose.Types.ObjectId,
    idReuniao: mongoose.Types.ObjectId,
  ) {
    return this.mentoriaModel
      .findByIdAndUpdate(id, { $push: { reuniao: idReuniao } }, { new: true })
      .populate('reuniao')
      .exec();
  }

  async updateFeedbackMentoria(id: mongoose.Types.ObjectId, feedback: string) {
    return await this.mentoriaModel
      .findByIdAndUpdate(id, { $set: { feedback: feedback } }, { new: true })
      .select('id feedback')
      .exec();
  }

  async aceitarMentoria(id: mongoose.Types.ObjectId) {
    const mentoria = await this.mentoriaModel
      .findByIdAndUpdate(
        id,
        { $set: { status: EnumStatusMentoria.ATIVA } },
        { new: true },
      )
      .exec();
    await this.userService.addMentoriaAtiva(mentoria.idMentor, mentoria._id);
    await this.userService.addMentoriaAtiva(mentoria.idAluno, mentoria._id);
    return mentoria;
  }

  // async findById(id: mongoose.Types.ObjectId) {
  //   return this.mentoriaModel.findById(id).populate('reuniao idAluno idMentor');
  // }

  async findById(id: mongoose.Types.ObjectId) {
    const mentoria = await this.mentoriaModel
      .findById(id)
      .populate('reuniao')
      .populate({
        path: 'idAluno',
        select: 'nome', // Campos específicos do aluno
      })
      .populate({
        path: 'idMentor',
        select: 'nome experiencia', // Campos específicos do mentor
      })
      .lean();

    return {
      ...mentoria,
      proximoEncontro: this.getDataProximoEncontro(mentoria),
    };
  }
}
