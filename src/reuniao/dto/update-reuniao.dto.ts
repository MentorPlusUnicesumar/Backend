import { PartialType } from '@nestjs/mapped-types';
import { CreateReuniaoDto } from './create-reuniao.dto';

export class UpdateReuniaoDto extends PartialType(CreateReuniaoDto) {}
