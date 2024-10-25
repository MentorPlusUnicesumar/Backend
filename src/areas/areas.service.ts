import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Area, AreaDocument } from './schema/area.schema';
import mongoose, { Model } from 'mongoose';
import { AreaInterface } from './interface/area.interface';

@Injectable()
export class AreasService {
  constructor(
    @InjectModel(Area.name)
    private areaModel: Model<AreaDocument>,
  ) {}

  create(createAreaDto: CreateAreaDto): Promise<AreaInterface> {
    return this.areaModel.create(createAreaDto);
  }

  findAll() {
    return this.areaModel.find().select('-__v -_id').exec();
  }

  findById(id: mongoose.Types.ObjectId): Promise<AreaInterface> {
    return this.areaModel.findById(id).select('-__v -_id').exec();
  }

  async findByName(name: string): Promise<AreaInterface | object> {
    const area = await this.areaModel.findOne({ nome: name }).exec();
    const allarea = (await this.findAll()).map((area) => area.nome);
    if (!area) {
      return {
        message: `Área não encontrada - Áreas cadastradas: [${allarea}]`,
      };
    }
    return this.areaModel.findOne({ nome: name }).exec();
  }

  update(id: mongoose.Types.ObjectId, updateAreaDto: UpdateAreaDto) {
    return this.areaModel
      .findByIdAndUpdate({ _id: id }, { $set: updateAreaDto }, { new: true })
      .select('-__v -_id')
      .exec();
  }

  remove(id: string) {
    return this.areaModel.deleteOne({ _id: id });
  }
}
