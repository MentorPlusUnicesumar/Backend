import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ValidateObjectIdPipe implements PipeTransform<any, string> {
  transform(value: any): string {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('ID inválido');
    }
    return value;
  }
}
