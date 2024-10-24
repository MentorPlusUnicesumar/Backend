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
import { EnumTypeUser } from 'src/users/enums/user-type';
import { EnumStatusUser } from 'src/users/enums/user-status';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { CardMentoria } from './interface/card.interface';
import { ApiTags } from '@nestjs/swagger';
// import { UpdateMentoriaDto } from './dto/update-mentoria.dto';

@ApiTags('mentorias')
@Controller('mentorias')
export class MentoriasController {
  constructor(private readonly mentoriasService: MentoriasService) {}

  @Get('cards')
  async cardsMentorias(
    @UserId() id: mongoose.Types.ObjectId,
  ): Promise<CardMentoria[]> {
    return await this.mentoriasService.getCards(id);
  }
  @Get('id/:id')
  async findById(
    @Param('id') id: mongoose.Types.ObjectId,
  ): Promise<MentoriaInterface> {
    return await this.mentoriasService.findById(id);
  }

  @Post()
  @Roles([EnumTypeUser.Mentor], [EnumStatusUser.APROVADO])
  create(
    @Body() createMentoriaDto: CreateMentoriaDto,
  ): Promise<MentoriaInterface | object> {
    return this.mentoriasService.create(createMentoriaDto);
  }

  @Patch(':id')
  async updateFeedbackMentoria(
    @Param('id') id: mongoose.Types.ObjectId,
    @Body('feedback') feedback: string,
  ): Promise<MentoriaInterface> {
    return await this.mentoriasService.updateFeedbackMentoria(id, feedback);
  }

  @Patch('accept/:id')
  async aceitarMentoria(
    @Param('id') id: mongoose.Types.ObjectId,
  ): Promise<MentoriaInterface> {
    return await this.mentoriasService.aceitarMentoria(id);
  }
}
