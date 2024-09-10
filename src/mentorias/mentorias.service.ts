import { Injectable } from '@nestjs/common';
import { CreateMentoriaDto } from './dto/create-mentoria.dto';
// import { UpdateMentoriaDto } from './dto/update-mentoria.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Mentoria, MentoriaDocument } from './schema/mentoria.schema';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

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
}
