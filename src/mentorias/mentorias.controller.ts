import {
  Controller,
  Get,
  Post,
  Body,
  //Patch,
  //Param,
  //Delete,
} from '@nestjs/common';
import { MentoriasService } from './mentorias.service';
import { CreateMentoriaDto } from './dto/create-mentoria.dto';
import { MentoriaInterface } from './interface/mentoria.interface';
import { UserId } from 'src/users/decorator/user-id.dto';
import mongoose from 'mongoose';
import { CardMentoriaMentorado } from './interface/card-mentoria.interface';
// import { UpdateMentoriaDto } from './dto/update-mentoria.dto';

@Controller('mentorias')
export class MentoriasController {
  constructor(private readonly mentoriasService: MentoriasService) {}

  @Post()
  create(
    @Body() createMentoriaDto: CreateMentoriaDto,
  ): Promise<MentoriaInterface | object> {
    return this.mentoriasService.create(createMentoriaDto);
  }

  @Get('cards_mentorado')
  async cardsMentorad(
    @UserId() id: mongoose.Types.ObjectId,
  ): Promise<CardMentoriaMentorado[]> {
    return await this.mentoriasService.cardsMentorados(id);
  }
}
