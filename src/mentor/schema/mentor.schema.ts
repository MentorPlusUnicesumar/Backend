import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schema/user.schema';

export type MentorDocument = HydratedDocument<Mentor>;

@Schema()
export class Mentor extends User {
  
}

export const MentorSchema = SchemaFactory.createForClass(Mentor);
