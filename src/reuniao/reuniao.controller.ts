import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ReuniaoService } from './reuniao.service';
import { CreateReuniaoDto } from './dto/create-reuniao.dto';
import { ValidateObjectIdPipe } from 'src/common/pipes/validate-object-id.pipe';
import mongoose from 'mongoose';
import { ReuniaoInterface } from './interface/reuniao.interface';
import { Public } from 'src/auth/decorator/auth.decorator';
import { EnumStatusReuniao } from './enum/reuniao-status';
import { ApiTags } from '@nestjs/swagger';
import { UpdateReuniaoDto } from './dto/update-reuniao.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('reuniao')
@Controller('reuniao')
export class ReuniaoController {
  constructor(private readonly reuniaoService: ReuniaoService) {}

  @Post()
  // @Roles([EnumTypeUser.Mentor], [EnumStatusUser.APROVADO])
  create(@Body() createReuniaoDto: CreateReuniaoDto) {
    return this.reuniaoService.create(createReuniaoDto);
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
  //@Roles([EnumTypeUser.Mentor], [EnumStatusUser.APROVADO])
  @ApiBearerAuth('JWT-auth')
  async updateReuniao(
    @Param('id', ValidateObjectIdPipe) id: mongoose.Types.ObjectId,
    @Body() updateReuniaoDto: UpdateReuniaoDto,
  ): Promise<ReuniaoInterface> {
    return await this.reuniaoService.updateReuniao(id, updateReuniaoDto);
  }

  @Public()
  @Patch('status/:id')
  private updateReuniaoStatus(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Body() status: EnumStatusReuniao,
  ) {
    try {
      return this.reuniaoService.updateReuniaoStatus(id, status);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Erro ao atualizar o status da Reunião',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
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
