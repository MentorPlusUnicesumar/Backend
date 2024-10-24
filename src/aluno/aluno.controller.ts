import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { FiltroMentorDto } from './dto/filtro-mentor.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('aluno')
@Controller('aluno')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Get()
  findAll() {
    return this.alunoService.findAll();
  }

  @Get('filtro')
  private filtroUsers(@Body() filtroMentorDto: FiltroMentorDto) {
    return this.alunoService.filtroMentores(filtroMentorDto);
  }

  @Post()
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.alunoService.update(id, updateAlunoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alunoService.remove(id);
  }
}
