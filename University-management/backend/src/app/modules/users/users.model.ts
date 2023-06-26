import { Model, Schema, model } from 'mongoose'
import { IUser, UserModel } from './users.interface'

const userSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'student',
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
  }
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
  }
}
)
export const User = model<IUser, UserModel>('User', userSchema)
