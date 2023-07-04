import { parseISO } from 'date-fns';
import { Conversation, DryConversation } from '../../../types';

export async function getConversation(id: string): Promise<Conversation> {
  const result = await fetch(`/conversations/${id}.json`);
  const json = (await result.json()) as DryConversation;
  return {
    ...json,
    last_updated: parseISO(json.last_updated),
    messages: json.messages.map((message) => ({
      ...message,
      last_updated: parseISO(message.last_updated),
    })),
  };
}
