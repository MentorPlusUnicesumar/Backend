import mongoose from 'mongoose';

export interface AuthInterface {
  _id: mongoose.Types.ObjectId;
  access_token: string;
  refresh_token: string;
}
