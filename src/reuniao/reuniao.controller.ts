import { Controller, Post, Body, Param } from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
// import { UpdateReuniaoDto } from './dto/update-reuniao.dto';
import { ValidateObjectIdPipe } from 'src/common/pipes/validate-object-id.pipe';
import mongoose from 'mongoose';
import { EnumTypeUser } from 'src/users/enums/user-type';
import { EnumStatusUser } from 'src/users/enums/user-status';
import { Roles } from 'src/auth/decorator/roles.decorator';

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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateReuniaoDto: UpdateReuniaoDto) {
  //   return this.reuniaoService.update(+id, updateReuniaoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.reuniaoService.remove(+id);
  // }
}
