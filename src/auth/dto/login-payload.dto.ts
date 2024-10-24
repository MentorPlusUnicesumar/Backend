import mongoose from 'mongoose';
import { EnumStatusUser } from 'src/users/enums/user-status';
import { EnumTypeUser } from 'src/users/enums/user-type';

export class LoginPayload {
  _id: mongoose.Types.ObjectId;
  idUser: mongoose.Types.ObjectId;
  typeUser: EnumTypeUser;
  status: EnumStatusUser;
  email: string;

  constructor(user: any) {
    this._id = user._id;
    this.idUser = user.idUser._id;
    this.typeUser = user.idUser.typeUser;
    this.status = user.idUser.status;
    this.email = user.idUser.email;
  }
}
