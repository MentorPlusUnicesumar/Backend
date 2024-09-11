import { Injectable } from '@nestjs/common';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
//import { UpdateReuniaoDto } from './dto/update-reuniao.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reuniao, ReuniaoDocument } from './schema/reuniao.schema';
import mongoose, { Model } from 'mongoose';
import { MentoriasService } from 'src/mentorias/mentorias.service';
import { EnumStatusReuniao } from './enum/reuniao-status';

@Injectable()
export class ReuniaoService {
  constructor(
    @InjectModel(Reuniao.name)
    private reuniaoModel: Model<ReuniaoDocument>,
    private mentoriaService: MentoriasService,
  ) {}

  async create(id: mongoose.Types.ObjectId, createReuniaoDto: CreateReuniaoDto) {
    createReuniaoDto.status = EnumStatusReuniao.PENDENTE;
    createReuniaoDto.feedback = '';
    createReuniaoDto.idMentoria = id;
    await this.reuniaoModel.create(createReuniaoDto);
    const reuniao = new this.reuniaoModel(createReuniaoDto);
    await reuniao.save();
    return this.mentoriaService.createReuniao(id, reuniao);
  }

  // findAll() {
  //   return `This action returns all reuniao`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} reuniao`;
  // }

  // update(id: number, updateReuniaoDto: UpdateReuniaoDto) {
  //   return `This action updates a #${id} reuniao`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} reuniao`;
  // }
}
