import mongoose from 'mongoose';

const connectDatabase = () => {
  mongoose.connect(process.env.DATABASE_URL as string, {
    dbName: 'doorstepservices',
  });
};

export default connectDatabase;
