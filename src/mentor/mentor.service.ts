import { Injectable } from '@nestjs/common';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { Mentor, MentorDocument } from './schema/mentor.schema';
import { Model } from 'mongoose';
import { UserDadosInterface } from 'src/users/dto/user-dados.dto';
import { MentorDadosInterface } from './dto/mentor-dados.interface';
import { EnumTypeUser } from 'src/users/enums/user-type';
import { MentorInterface } from './interface/mentor.interface';

@Injectable()
export class MentorService {
  constructor(
    @InjectModel(Mentor.name)
    private mentorModel: Model<MentorDocument>,
    private usersService: UsersService,
  ) {}

  async create(createMentorDto: CreateMentorDto) {
    const userData = new UserDadosInterface(createMentorDto);
    userData.typeUser = EnumTypeUser.Mentor;
    const mentorData = new MentorDadosInterface(createMentorDto);
    const user = await this.usersService.create(userData);
    const mentor = new this.mentorModel({ idUser: user._id, ...mentorData });
    return await (await mentor.save()).populate('idUser areaDeEnsino');
  }

  findAll() {
    return this.mentorModel.find().populate('idUser areaDeEnsino');
  }

  async update(
    id: string,
    updateMentorDto: UpdateMentorDto,
  ): Promise<MentorInterface> {
    return this.mentorModel
      .findByIdAndUpdate({ _id: id }, { $set: updateMentorDto }, { new: true })
      .populate('idUser areaDeEnsino');
  }

  async remove(id: string) {
    const user = await this.mentorModel.findByIdAndDelete(id);
    return this.usersService.remove(user.idUser);
  }
}
