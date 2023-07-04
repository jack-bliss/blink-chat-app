import { Link } from 'react-router-dom';
import { Conversation } from '../../../types';
import { isBefore } from 'date-fns';

type ConversationListProps = {
  conversations: Omit<Conversation, 'messages'>[];
};

export function ConversationList({
  conversations,
}: ConversationListProps) {
  return (
    <div className="conversation-list">
      {conversations
        .sort((a, b) =>
          isBefore(a.last_updated, b.last_updated) ? 1 : -1,
        )
        .map((conversation) => {
          return (
            <div>
              <Link to={`/${conversation.id}`}>{conversation.name}</Link>
            </div>
          );
        })}
    </div>
  );
}
