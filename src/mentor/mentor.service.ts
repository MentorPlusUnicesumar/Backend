import { Injectable } from '@nestjs/common';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class MentorService extends UsersService{

}
