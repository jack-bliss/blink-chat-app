import { useParams } from 'react-router';
import { format, isBefore } from 'date-fns';
import { useCallback, useEffect, useRef } from 'preact/hooks';
import { useQuery } from '../../hooks/use-query';
import { JSXInternal } from 'preact/src/jsx';
import { getConversation } from './get-conversation';
import { getFormInputElement } from './get-form-input-element';
import { submitMessage } from './submit-message';
import { scrollInToView } from './scroll-in-to-view';
import { Message } from '../message';

type ConversationDetailProps = {
  updateLastUpdatedTime: (
    conversationId: string,
    last_updated: Date,
  ) => void;
};

export function ConversationDetail({
  updateLastUpdatedTime,
}: ConversationDetailProps) {
  const { id } = useParams();

  const getSelectedConversation = useCallback(async () => {
    return getConversation(String(id));
  }, [id]);

  const conversation = useQuery(getSelectedConversation);

  const scrollAnchor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversation.state !== 'ready') {
      return;
    }
    scrollInToView(scrollAnchor);
  }, [conversation]);

  const onSubmitMessageForm = useCallback(
    async (e: JSXInternal.TargetedEvent<HTMLFormElement, Event>) => {
      e.preventDefault();
      if (conversation.state !== 'ready') {
        return;
      }
      const messageElement = getFormInputElement(e.target, 'message');
      const text = messageElement.value;
      const message = await submitMessage(conversation.result.id, text);
      conversation.setResult((prev) => {
        if (!prev) {
          throw new Error(`Can't update state with no conversation`);
        }
        return {
          ...prev,
          messages: [...prev.messages, message],
        };
      });
      messageElement.value = '';
      updateLastUpdatedTime(conversation.result.id, message.last_updated);
    },
    [conversation, updateLastUpdatedTime],
  );

  if (conversation.state === 'loading') {
    return (
      <div>
        <h3>Loading...</h3>
      </div>
    );
  }
  if (conversation.state === 'error') {
    return (
      <div>
        <h2>{String(conversation.error)}</h2>
      </div>
    );
  }
  return (
    <>
      <div className="conversation-detail">
        {conversation.result.messages
          .sort((a, b) => {
            return isBefore(a.last_updated, b.last_updated) ? -1 : 1;
          })
          .map((message) => (
            <Message
              message={message}
              key={message.id}
            />
          ))}
        <div ref={scrollAnchor}></div>
      </div>
      <form
        className="conversation-input"
        onSubmit={onSubmitMessageForm}
      >
        <input
          className="text-input"
          type="text"
          name="message"
        />
        <input
          type="submit"
          value="Send"
        />
      </form>
    </>
  );
}
