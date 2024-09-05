import { PartialType } from '@nestjs/mapped-types';
import { CreateMentoriaDto } from './create-mentoria.dto';

export class UpdateMentoriaDto extends PartialType(CreateMentoriaDto) {}
