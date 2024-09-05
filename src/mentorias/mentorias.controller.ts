import {
  Controller,
  Get,
  Post,
  Body,
  //Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MentoriasService } from './mentorias.service';
import { CreateMentoriaDto } from './dto/create-mentoria.dto';
// import { UpdateMentoriaDto } from './dto/update-mentoria.dto';

@Controller('mentorias')
export class MentoriasController {
  constructor(private readonly mentoriasService: MentoriasService) {}

  @Post()
  create(@Body() createMentoriaDto: CreateMentoriaDto) {
    return this.mentoriasService.create(createMentoriaDto);
  }

  @Get()
  findAll() {
    return this.mentoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mentoriasService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateMentoriaDto: UpdateMentoriaDto,
  // ) {
  //   return this.mentoriasService.update(+id, updateMentoriaDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mentoriasService.remove(+id);
  }
}
