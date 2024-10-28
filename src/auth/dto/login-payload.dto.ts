import mongoose from 'mongoose';
import { EnumStatusUser } from 'src/users/enums/user-status';
import { EnumTypeUser } from 'src/users/enums/user-type';

export class LoginPayload {
  _id: mongoose.Types.ObjectId;
  typeUser: EnumTypeUser;
  status: EnumStatusUser;
  email: string;

  constructor(user: any) {
    this._id = user._id;
    this.typeUser = user.typeUser;
    this.status = user.status;
    this.email = user.email;
  }
}
