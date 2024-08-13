import mongoose, { ObjectId } from "mongoose";
import { EnumTypeUser } from "src/users/enums/user-type";
import { User, UserDocument } from "src/users/schema/user.schema";


export class LoginPayload {
  _id: mongoose.Types.ObjectId;
  typeUser: EnumTypeUser;

  constructor(user: UserDocument) {
    this._id = user._id;
    this.typeUser = user.typeUser;
  }
}