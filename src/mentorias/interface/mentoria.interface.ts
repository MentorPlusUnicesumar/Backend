import { ReuniaoMentoriaDto } from '../dto/reuniao-mentoria.dto';
import { EnumStatusMentoria } from '../enums/mentorias-status';

export interface MentoriaInterface {
  idMentor: string;
  idMentorado: string;
  reuniao: ReuniaoMentoriaDto[];
  status: EnumStatusMentoria;
  feedback: string;
  materialAnexado: string[];
}
