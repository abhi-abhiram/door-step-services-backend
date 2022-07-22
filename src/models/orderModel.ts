import mongoose, { Document, Types, Model } from 'mongoose';

export enum OrderStatus {
  DELIVERED = 'delivered',
  PROCESSING = 'processing',
  ARRIVING = 'arriving',
}

export enum PaymentStatus {
  FAILED = 'failed',
  COMPLETED = 'complete',
  PENDING = 'pending',
  PROCESSING = 'processing',
}

interface Order {
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  serviceDate: Date;
  city: string;
  professional: string;
  serviceId: string;
  paymentInfo: {
    id: string;
    status: PaymentStatus;
  };
  paidAt: Date;
  totalPrice: number;
  orderStatus: string;
  deliveredAt: Date;
  createdAt: Date;
  note: string;
  serviceDesc: string;
}

export type OrderModel = Model<Order>;

const OrderSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  serviceDate: {
    type: Date,
    required: [true, 'Date is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  professional: {
    type: String,
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: OrderStatus.PROCESSING,
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  note: {
    type: String,
  },
  serviceDesc: {
    type: String,
  },
  serviceId: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Order, OrderModel>('order', OrderSchema);

export type OrderObj = Document<unknown, unknown, Order> &
  Order & {
    _id: Types.ObjectId;
  };
