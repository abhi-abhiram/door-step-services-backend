import mongoose, { Model, Document, Types } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export enum Roles {
  USER = 'user',
  PROFESSIONAL = 'professional',
  ADMIN = 'admin',
}

export interface User {
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  role: Roles;
  createdAt: Date;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
}

export interface UserMethods {
  getJWTToken(): string;
  comparePassword(password: string): Promise<boolean>;
  getResetPasswordToken(): string;
}

// eslint-disable-next-line @typescript-eslint/ban-types
export type UserModel = Model<User, {}, UserMethods>;

const userSchema = new mongoose.Schema<User, UserModel, UserMethods>({
  name: {
    type: String,
    required: [true, 'Please Enter Your Name'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
    minLength: [4, 'Name should have more than 4 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please Enter Your Email'],
    unique: true,
    validate: [validator.isEmail, 'Please Enter a valid Email'],
  },
  phoneNo: {
    type: String,
    required: [true, 'Please Enter you Phone number'],
    unique: true,
    validate: [validator.isMobilePhone, 'Please Enter a valid Phone number'],
  },
  password: {
    type: String,
    required: [true, 'Please Enter Your Password'],
    minLength: [8, 'Password should be greater than 8 characters'],
    select: false,
  },
  role: {
    type: String,
    default: Roles.USER,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },

  state: {
    type: String,
  },

  country: {
    type: String,
  },
  pinCode: {
    type: Number,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre('save', async function encryptPassword(next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.method('getJWTToken', function getJWTToken() {
  // eslint-disable-next-line no-underscore-dangle
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRE,
  });
});

userSchema.method(
  'comparePassword',
  async function comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }
);

// Generating Password Reset Token
userSchema.method('getResetPasswordToken', function getResetPasswordToken() {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
});

export default mongoose.model<User, UserModel>('User', userSchema);

export type UserObj = Document<unknown, unknown, User> &
  User & {
    _id: Types.ObjectId;
  } & UserMethods;
