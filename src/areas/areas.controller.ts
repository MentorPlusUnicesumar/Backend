import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import mongoose from 'mongoose';
import { ApiTags } from '@nestjs/swagger';
import { FiltroAreaDto } from './dto/filtro-area.dto';
import { ValidateObjectIdPipe } from 'src/common/pipes/validate-object-id.pipe';

@ApiTags('areas')
@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) {}

  @Get()
  findAll() {
    return this.areasService.findAll();
  }

  @Get('id/:id')
  findById(@Param('id', ValidateObjectIdPipe) id: mongoose.Types.ObjectId) {
    return this.areasService.findById(id);
  }

  @Get('nome')
  findByName(@Body('nome') name: string) {
    return this.areasService.findByName(name);
  }

  @Post()
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.create(createAreaDto);
  }

  @Patch(':id')
  update(
    @Param('id', ValidateObjectIdPipe) id: mongoose.Types.ObjectId,
    @Body() updateAreaDto: UpdateAreaDto,
  ) {
    return this.areasService.update(id, updateAreaDto);
  }

  @Delete(':id')
  remove(@Param('id', ValidateObjectIdPipe) id: string) {
    return this.areasService.remove(id);
  }

  @Get('detalhes')
  async findAreasDetalhes(@Query() query: FiltroAreaDto) {
    return await this.areasService.findAreaDetalhes(query);
  }
}
