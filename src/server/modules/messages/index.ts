import { Router } from 'express';
import { saveMessage } from './service';

export const messages = Router();

messages.post('/', async (req, res, next) => {
  try {
    const { conversationId, text } = req.body;
    const message = await saveMessage(conversationId, text);
    return res.send(message);
  } catch (error) {
    return next(error);
  }
});
