import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  //Delete,
} from '@nestjs/common';
import { MentoriasService } from './mentorias.service';
import { CreateMentoriaDto } from './dto/create-mentoria.dto';
import { MentoriaInterface } from './interface/mentoria.interface';
import { UserId } from 'src/users/decorator/user-id.dto';
import mongoose from 'mongoose';
import {
  CardMentoriaMentor,
  CardMentoriaMentorado,
} from './interface/card-mentoria.interface';
import { EnumTypeUser } from 'src/users/enums/user-type';
import { EnumStatusUser } from 'src/users/enums/user-status';
import { Roles } from 'src/auth/decorator/roles.decorator';
// import { UpdateMentoriaDto } from './dto/update-mentoria.dto';

@Controller('mentorias')
export class MentoriasController {
  constructor(private readonly mentoriasService: MentoriasService) {}

  @Post()
  @Roles([EnumTypeUser.Mentor], [EnumStatusUser.APROVADO])
  create(
    @Body() createMentoriaDto: CreateMentoriaDto,
  ): Promise<MentoriaInterface | object> {
    return this.mentoriasService.create(createMentoriaDto);
  }

  @Get('cards-mentorado')
  async cardsMentorado(
    @UserId() id: mongoose.Types.ObjectId,
  ): Promise<CardMentoriaMentorado[]> {
    return await this.mentoriasService.cardsMentorado(id);
  }

  @Get('cards-mentor')
  async cardsMentor(
    @UserId() id: mongoose.Types.ObjectId,
  ): Promise<CardMentoriaMentor[]> {
    return await this.mentoriasService.cardsMentor(id);
  }

  @Patch(':id')
  async updateFeedbackMentoria(
    @Param('id') id: mongoose.Types.ObjectId,
    @Body('feedback') feedback: string,
  ): Promise<MentoriaInterface> {
    return await this.mentoriasService.updateFeedbackMentoria(id, feedback);
  }
}
