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
    const mentor = await this.userService.findById(createMentoriaDto.idMentor);
    const mentorado = await this.userService.findById(
      createMentoriaDto.idMentorado,
    );

    console.log(mentor);
    console.log(mentorado);

    if (mentor.typeUser == 'Mentor' && mentorado.typeUser == 'Mentorado') {
      return this.mentoriaModel.create(createMentoriaDto);
    } else if (mentor.typeUser != 'Mentor') {
      return { message: 'Somente Mentores podem criar uma mentoria' };
    } else if (mentorado.typeUser != 'Mentorado') {
      return { message: 'Mentoria é somente entre mentorados e mentores' };
    }
  }

  findAll() {
    return `This action returns all mentorias`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mentoria`;
  }

  // update(id: number, updateMentoriaDto: UpdateMentoriaDto) {
  //   return `This action updates a #${id} mentoria`;
  // }

  remove(id: number) {
    return `This action removes a #${id} mentoria`;
  }
}
