import { Document, Types } from 'mongoose';

export interface IJob extends Document {
  title: string;
  description: string;
  skills: string[];
  createdBy: Types.ObjectId;
}
