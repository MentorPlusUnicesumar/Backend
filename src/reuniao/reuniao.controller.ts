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
// import { UpdateReuniaoDto } from './dto/update-reuniao.dto';
import { ValidateObjectIdPipe } from 'src/common/pipes/validate-object-id.pipe';
import mongoose from 'mongoose';
import { EnumTypeUser } from 'src/users/enums/user-type';
import { EnumStatusUser } from 'src/users/enums/user-status';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { ReuniaoInterface } from './interface/reuniao.interface';
import { Public } from 'src/auth/decorator/auth.decorator';
import { EnumStatusReuniao } from './enum/reuniao-status';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('reuniao')
@Controller('reuniao')
export class ReuniaoController {
  constructor(private readonly reuniaoService: ReuniaoService) {}

  @Post()
  // @Roles([EnumTypeUser.Mentor], [EnumStatusUser.APROVADO])
  create(@Body() createReuniaoDto: CreateReuniaoDto) {
    console.log('createReuniaoDto', createReuniaoDto);
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
  @Roles([EnumTypeUser.Mentor], [EnumStatusUser.APROVADO])
  @ApiBearerAuth('JWT-auth')
  async updateFeedbackReuniao(
    @Param('id') id: mongoose.Types.ObjectId,
    @Body('feedback') feedback: string,
  ): Promise<ReuniaoInterface> {
    return await this.reuniaoService.updateFeedbackReuniao(id, feedback);
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
