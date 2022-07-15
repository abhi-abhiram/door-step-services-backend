import express from 'express';
import cookieparser from 'cookie-parser';
import bodyParser from 'body-parser';
import { IncomingMessage } from 'http';
import cors from 'cors';
import { common, professional, admin } from './routes';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';
import swaggerDocs from './utils/swagger';
import user from './routes/user';

const app = express();

interface CustomIncomingMsg extends IncomingMessage {
  rawBody: Buffer;
}

const allowedOrigins = [
  'https://doorstep-services-website-liard.vercel.app/',
  'http://localhost:3000',
  'https://door-step-services.herokuapp.com/',
];

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(
  express.json({
    verify: (req: CustomIncomingMsg, res, buffer) => {
      req.rawBody = buffer;
    },
  })
);

app.use(cookieparser());
app.use(bodyParser.urlencoded({ extended: true }));

swaggerDocs(app);
app.use('/api/professional', professional);
app.use('/api/', common);
app.use('/api/admin', admin);
app.use('/api/user', user);

app.use(errorHandlerMiddleware);

export default app;
