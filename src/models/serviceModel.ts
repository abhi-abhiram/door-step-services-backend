import mongoose, { Model, Document, Types } from 'mongoose';

export interface Service {
  name: string;
  active: boolean;
  price: number;
}

export type ServiceModel = Model<Service>;

const ServiceSchema = new mongoose.Schema<Service, ServiceModel>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  active: {
    type: Boolean,
    required: [true, 'Acitive field is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
});

export default mongoose.model<Service, ServiceModel>('Service', ServiceSchema);

export type ServiceObj = Document<unknown, unknown, Service> &
  Service & {
    _id: Types.ObjectId;
  };
