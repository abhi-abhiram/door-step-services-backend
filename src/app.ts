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

app.use(
  cors({
    origin: [
      'https://doorstep-services-website-liard.vercel.app',
      'http://localhost:3000',
    ],
    preflightContinue: true,
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

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
