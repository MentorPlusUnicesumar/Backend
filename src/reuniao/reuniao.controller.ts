import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
// import { UpdateReuniaoDto } from './dto/update-reuniao.dto';
import { ValidateObjectIdPipe } from 'src/common/pipes/validate-object-id.pipe';
import mongoose from 'mongoose';
import { EnumTypeUser } from 'src/users/enums/user-type';
import { EnumStatusUser } from 'src/users/enums/user-status';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { ReuniaoInterface } from './interface/reuniao.interface';

@Controller('reuniao')
export class ReuniaoController {
  constructor(private readonly reuniaoService: ReuniaoService) {}

  @Post(':id')
  @Roles([EnumTypeUser.Mentor], [EnumStatusUser.APROVADO])
  create(
    @Param('id', ValidateObjectIdPipe) id: mongoose.Types.ObjectId,
    @Body() createReuniaoDto: CreateReuniaoDto,
  ) {
    return this.reuniaoService.create(id, createReuniaoDto);
  }

  // @Get()
  // findAll() {
  //   return this.reuniaoService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.reuniaoService.findOne(+id);
  // }

  @Patch(':id')
  @Roles([EnumTypeUser.Mentorado], [EnumStatusUser.APROVADO])
  async updateFeedbackReuniao(
    @Param('id') id: mongoose.Types.ObjectId,
    @Body('feedback') feedback: string,
  ): Promise<ReuniaoInterface> {
    return await this.reuniaoService.updateFeedbackReuniao(id, feedback);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReuniaoDto: UpdateReuniaoDto) {
  //   return this.reuniaoService.update(+id, updateReuniaoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reuniaoService.remove(+id);
  // }
}
