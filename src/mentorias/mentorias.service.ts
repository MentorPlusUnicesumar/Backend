import { Injectable } from '@nestjs/common';
import { CreateMentoriaDto } from './dto/create-mentoria.dto';
// import { UpdateMentoriaDto } from './dto/update-mentoria.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Mentoria, MentoriaDocument } from './schema/mentoria.schema';
import mongoose, { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CardMentoriaMentorado } from './interface/card-mentoria.interface';
import { CreateReuniaoDto } from 'src/reuniao/dto/create-reuniao.dto';

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
    const mentorado = await this.userService.findById(
      createMentoriaDto.idMentorado,
    );
    if (mentor.typeUser == 'Mentor' && mentorado.typeUser == 'Mentorado') {
      return this.mentoriaModel.create(mentoriasData);
    } else if (mentor.typeUser != 'Mentor') {
      return { message: 'Somente Mentores podem criar uma mentoria' };
    } else if (mentorado.typeUser != 'Mentorado') {
      return { message: 'Mentoria é somente entre mentorados e mentores' };
    }
  }

  private getDataProximoEncontro(mentoria: Mentoria): string {
    const dataAtual = new Date();
    const reunioes = mentoria.reuniao;
    let proximaData = 'Não definida';

    reunioes.sort((a, b) => a.diaReuniao.getTime() - b.diaReuniao.getTime());

    for (let i = 0; i < reunioes.length; i++) {
      if (reunioes[i].diaReuniao > dataAtual) {
        proximaData = reunioes[i].diaReuniao.toLocaleDateString('pt-BR');
        break;
      }
    }

    return proximaData;
  }


  async cardsMentorados(
    id: mongoose.Types.ObjectId,
  ): Promise<CardMentoriaMentorado[]> {
    const mentorias = await this.mentoriaModel.find({ idMentorado: id });

    // Utilize Promise.all dentro do map para garantir que todas as promises sejam resolvidas
    const cards = await Promise.all(
      mentorias.map(async (mentoria) => {
        return {
          nome: mentoria.nome,
          proximoEncontro: this.getDataProximoEncontro(mentoria),
          nomeMentor: (await this.userService.findById(mentoria.idMentor)).name,
        };
      }),
    );

    return cards;
  }

  async createReuniao(
    id: mongoose.Types.ObjectId,
    createReuniaoDto: CreateReuniaoDto,
  ) {
    return this.mentoriaModel.findByIdAndUpdate(
      id,
      { $push: { reuniao: createReuniaoDto } },
      { new: true },
    );
  }
}
