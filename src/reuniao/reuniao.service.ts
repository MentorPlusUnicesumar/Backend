import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reuniao, ReuniaoDocument } from './schema/reuniao.schema';
import mongoose, { Model } from 'mongoose';
import { MentoriasService } from 'src/mentorias/mentorias.service';
import { EnumStatusReuniao } from './enum/reuniao-status';
import { ReuniaoInterface } from './interface/reuniao.interface';
import { GoogleService } from 'src/google/google.service';
import { UpdateReuniaoDto } from './dto/update-reuniao.dto';

@Injectable()
export class ReuniaoService {
  constructor(
    @InjectModel(Reuniao.name)
    private reuniaoModel: Model<ReuniaoDocument>,
    private mentoriaService: MentoriasService,
    private googleService: GoogleService,
  ) {}

  async create(createReuniaoDto: CreateReuniaoDto) {
    createReuniaoDto.status = EnumStatusReuniao.PENDENTE;
    createReuniaoDto.feedback = '';

    const emails = await this.mentoriaService.emailsMentoria(
      createReuniaoDto.idMentoria,
    );

    const emailsArray: string[] = [emails.emailAluno, emails.emailMentor];
    const dataString = new Date(createReuniaoDto.diaReuniao).toISOString();

    createReuniaoDto.link = await this.googleService.createMeeting(
      dataString,
      emailsArray,
    );

    const reuniao = new this.reuniaoModel(createReuniaoDto);
    await reuniao.save();
    return this.mentoriaService.createReuniao(
      createReuniaoDto.idMentoria,
      reuniao._id,
    );
  }

  async updateReuniao(
    id: mongoose.Types.ObjectId,
    updateReuniaoDto: UpdateReuniaoDto,
  ) {
    const reuniao = await this.reuniaoModel.findByIdAndUpdate(
      id,
      updateReuniaoDto,
      { new: true },
    );
    return reuniao;
  }

  async updateFeedbackReuniao(id: mongoose.Types.ObjectId, feedback: string) {
    return await this.reuniaoModel.findByIdAndUpdate(
      id,
      { $set: { feedback: feedback } },
      { new: true },
    );
  }

  async updateReuniaoStatus(
    id: string,
    status: EnumStatusReuniao,
  ): Promise<ReuniaoInterface> {
    const reuniao = await this.reuniaoModel.findById(id);
    if (!reuniao) {
      throw new NotFoundException('Usuário não encontrado');
    }
    reuniao.status = status;
    return reuniao.save();
  }
}
