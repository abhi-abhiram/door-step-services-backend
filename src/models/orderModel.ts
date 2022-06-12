import mongoose from 'mongoose';

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

const orderSchema = new mongoose.Schema({
  service: {
    type: mongoose.Types.ObjectId,
    ref: 'Service',
    required: true,
  },

  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
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
    required: true,
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
    default: Date.now,
  },
});

export default mongoose.model('Order', orderSchema);
