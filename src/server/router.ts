import express from 'express';
import bodyParser from 'body-parser';
import { serveAssets } from './middleware/serve-assets';
import { handleError } from './middleware/handle-error';
import { home } from './modules/home';
import { messages } from './modules/messages';

export const app = express();

app.use(bodyParser.json());

app.use(serveAssets);

app.use('/messages', messages);
app.use('*', home);

app.use(handleError);
