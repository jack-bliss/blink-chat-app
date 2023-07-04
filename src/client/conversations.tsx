import { render } from 'preact';
import { useQuery } from './hooks/use-query';
import { Conversation, DryConversation } from '../types';
import { parseISO } from 'date-fns';
import { ConversationList } from './components/conversation-list';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConversationDetail } from './components/conversation-detail';
import { useCallback } from 'preact/hooks';

async function getConversations(): Promise<
  Omit<Conversation, 'messages'>[]
> {
  const result = await fetch('/conversations.json');
  const json = (await result.json()) as Omit<
    DryConversation,
    'messages'
  >[];
  return json.map((conversation) => ({
    ...conversation,
    last_updated: parseISO(conversation.last_updated),
  }));
}

function App() {
  const conversations = useQuery(getConversations);
  const updateLastUpdatedTime = useCallback(
    (conversationId: string, last_updated: Date) => {
      if (conversations.state !== 'ready') {
        return;
      }
      const conversationsList = conversations.result;
      const newConversationsList = conversationsList.map(
        (conversation) => {
          if (conversation.id !== conversationId) {
            return conversation;
          }
          return {
            ...conversation,
            last_updated,
          };
        },
      );
      conversations.setResult(newConversationsList);
    },
    [conversations],
  );
  if (conversations.state === 'loading') {
    return <h4>Loading...</h4>;
  }
  if (conversations.state === 'error') {
    return <h2>{String(conversations.error)}</h2>;
  }
  return (
    <BrowserRouter>
      <div className="page-wrapper">
        <ConversationList conversations={conversations.result} />
        <Routes>
          <Route
            path="/:id"
            element={
              <ConversationDetail
                updateLastUpdatedTime={updateLastUpdatedTime}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

render(<App />, document.getElementById('react-root') as HTMLElement);
