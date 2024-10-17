import { ArrayMinSize, IsArray, IsMongoId } from 'class-validator';
import mongoose from 'mongoose';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class CreateAlunoDto extends CreateUserDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  areasInteresse: mongoose.Types.ObjectId[];
}
