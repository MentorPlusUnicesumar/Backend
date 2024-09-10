import { Injectable } from '@nestjs/common';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
//import { UpdateReuniaoDto } from './dto/update-reuniao.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reuniao, ReuniaoDocument } from './schema/reuniao.schema';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class ReuniaoService {
  constructor(
    @InjectModel(Reuniao.name)
    private reuniaoModel: Model<ReuniaoDocument>
  ) {}

  create(id: mongoose.Types.ObjectId, createReuniaoDto: CreateReuniaoDto) {
    const {status, feedback, idMentoria, ...reuniaoData} = createReuniaoDto
    return this.reuniaoModel.create(reuniaoData);
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
