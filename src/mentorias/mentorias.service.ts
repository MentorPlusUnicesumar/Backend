import { Injectable } from '@nestjs/common';
import { CreateMentoriaDto } from './dto/create-mentoria.dto';
// import { UpdateMentoriaDto } from './dto/update-mentoria.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Mentoria, MentoriaDocument } from './schema/mentoria.schema';
import mongoose, { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { CreateReuniaoDto } from 'src/reuniao/dto/create-reuniao.dto';

@Injectable()
export class MentoriasService {
  constructor(
    @InjectModel(Mentoria.name)
    private mentoriaModel: Model<MentoriaDocument>,
    private userService: UsersService,
  ) {}
  async create(createMentoriaDto: CreateMentoriaDto) {
    const {reuniao, feedback, ...mentoriasData} = createMentoriaDto;
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

  async createReuniao(id: mongoose.Types.ObjectId, createReuniaoDto: CreateReuniaoDto) {
    return this.mentoriaModel.findByIdAndUpdate(id, { $push: { reuniao: createReuniaoDto } }, { new: true });
  }
}
