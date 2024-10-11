import { Injectable } from '@nestjs/common';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Aluno, AlunoDocument } from './entities/aluno.schema';
import { UsersService } from 'src/users/users.service';
import { UserDadosInterface } from 'src/users/dto/user-dados.dto';
import { Model } from 'mongoose';
import { EnumTypeUser } from 'src/users/enums/user-type';
import { AlunoDadosInterface } from './dto/aluno-dados.interface';
import { AlunoInterface } from './interface/aluno.interface';

@Injectable()
export class AlunoService {
  constructor(
    @InjectModel(Aluno.name)
    private alunoModel: Model<AlunoDocument>,
    private usersService: UsersService,
  ) {}

  async create(createAlunoDto: CreateAlunoDto) {
    const userData = new UserDadosInterface(createAlunoDto);
    userData.typeUser = EnumTypeUser.Aluno;
    const alunoData = new AlunoDadosInterface(createAlunoDto);
    const user = await this.usersService.create(userData);
    const aluno = new this.alunoModel({ idUser: user._id, ...alunoData });
    return await (await aluno.save()).populate('idUser areasInteresse');
  }

  findAll() {
    return this.alunoModel.find().populate('idUser areasInteresse');
  }

  async update(
    id: string,
    updateAlunoDto: UpdateAlunoDto,
  ): Promise<AlunoInterface> {
    return this.alunoModel
      .findByIdAndUpdate({ _id: id }, { $set: updateAlunoDto }, { new: true })
      .populate('idUser areasInteresse');
  }

  async remove(id: string) {
    const user = await this.alunoModel.findByIdAndDelete(id);
    return this.usersService.remove(user.idUser);
  }
}
