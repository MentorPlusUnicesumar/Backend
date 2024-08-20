import mongoose from 'mongoose';
import { EnumTypeUser } from 'src/users/enums/user-type';
import { UserDocument } from 'src/users/schema/user.schema';

export class LoginPayload {
  _id: mongoose.Types.ObjectId;
  typeUser: EnumTypeUser;
  email: string;

  constructor(user: UserDocument) {
    this._id = user._id;
    this.typeUser = user.typeUser;
    this.email = user.email;
  }
}
