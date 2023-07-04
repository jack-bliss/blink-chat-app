import { parseISO } from 'date-fns';
import { Message } from '../../../types';

export async function submitMessage(
  conversationId: string,
  text: string,
): Promise<Message> {
  const result = await fetch('/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      conversationId,
      text,
    }),
  });
  const response = await result.json();
  return {
    ...response,
    last_updated: parseISO(response.last_updated),
  };
}
