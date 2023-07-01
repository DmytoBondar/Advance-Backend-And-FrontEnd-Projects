import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './users.interface'
import bcrypt from 'bcrypt';
import config from '../../../config';
const UserSchema = new Schema<IUser, UserModel>({
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
  needsPasswordChange: {
    type: Boolean,
    default: true
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'student',
  },
  admin: {
    type: Schema.Types.ObjectId,
    ref: 'admin',
  },
  faculty: {
    type: Schema.Types.ObjectId,
    ref: 'facultiesUser'
  }
},
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    }
  }
);

UserSchema.statics.isUserExist = async function (id: string): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'> | null> {
  return await User.findOne({ id }, { id: 1, password: 1, role: 1, needsPasswordChange: 1 });
};

UserSchema.statics.isPasswordMatched = async function (givenPassword: string, savedpassword: string): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedpassword);
}

UserSchema.pre('save', async function (next) {
  let user = this;
  user.password = await bcrypt.hash(user.password, Number(config.saltRound));
  next();
})

export const User = model<IUser, UserModel>('User', UserSchema)