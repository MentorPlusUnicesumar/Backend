import { Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Area, AreaDocument } from './schema/area.schema';
import mongoose, { Model } from 'mongoose';
import { AreaInterface } from './interface/area.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AreasService {
  constructor(
    @InjectModel(Area.name) private areaModel: Model<AreaDocument>,
    private userService: UsersService,
  ) {}

  create(createAreaDto: CreateAreaDto): Promise<AreaInterface> {
    return this.areaModel.create(createAreaDto);
  }

  findAll() {
    return this.areaModel.find().select('-__v').exec();
  }

  findById(id: mongoose.Types.ObjectId): Promise<AreaInterface> {
    return this.areaModel.findById(id).select('-__v').exec();
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

  async findAreaDetalhes() {
    const areasDetalhes = await this.userService.getAreasDetalhes();

    const areas = await this.findAll();

    const resultado = areas.map((area) => {
      // Encontra o detalhe correspondente para a área
      const detalhe = areasDetalhes.find(
        (d) => d.area.toString() === area._id.toString(),
      );

      // Se o detalhe for encontrado, adiciona os números de mentores e alunos
      if (detalhe) {
        return {
          _id: area._id,
          nome: area.nome,
          numeroDeMentores: detalhe.numeroDeMentores,
          numeroDeAlunos: detalhe.numeroDeAlunos,
        };
      }

      // Caso não encontre o detalhe, apenas retorna a área sem números de mentores e alunos
      return {
        _id: area._id,
        nome: area.nome,
        numeroDeMentores: 0, // ou algum valor default
        numeroDeAlunos: 0, // ou algum valor default
      };
    });
    console.log('resultado', resultado);
    return resultado;
  }
}
