import {
  Controller,
  //Get,
  Post,
  Body,
  //Patch,
  //Param,
  //Delete,
} from '@nestjs/common';
import { MentoriasService } from './mentorias.service';
import { CreateMentoriaDto } from './dto/create-mentoria.dto';
import { MentoriaInterface } from './interface/mentoria.interface';
// import { UpdateMentoriaDto } from './dto/update-mentoria.dto';

@Controller('mentorias')
export class MentoriasController {
  constructor(private readonly mentoriasService: MentoriasService) {}

  @Post()
  create(@Body() createMentoriaDto: CreateMentoriaDto): Promise <MentoriaInterface | object> {
    return this.mentoriasService.create(createMentoriaDto);
  }

}
