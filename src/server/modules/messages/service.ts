import { randomUUID } from 'crypto';
import { getJsonAsset } from '../../services';
import { DryConversation, DryMessage } from '../../../types';
import { saveAsset } from '../../services/save-asset';

export async function saveMessage(conversationId: string, text: string) {
  const message: DryMessage = {
    text,
    last_updated: new Date().toISOString(),
    id: randomUUID(),
  };
  const [conversationData, conversationList] = await Promise.all([
    getJsonAsset<DryConversation>(`conversations/${conversationId}.json`),
    getJsonAsset<Omit<DryConversation[], 'messages'>>(
      `conversations.json`,
    ),
  ]);
  const newConversationData: DryConversation = {
    ...conversationData,
    last_updated: message.last_updated,
    messages: [...conversationData.messages, message],
  };
  const newConversationList = conversationList.map((conversation) => {
    if (conversation.id !== conversationId) {
      return conversation;
    }
    return {
      ...conversation,
      last_updated: message.last_updated,
    };
  });
  await Promise.all([
    saveAsset(
      `conversations/${conversationId}.json`,
      Buffer.from(JSON.stringify(newConversationData)),
    ),
    saveAsset(
      'conversations.json',
      Buffer.from(JSON.stringify(newConversationList)),
    ),
  ]);
  return message;
}
