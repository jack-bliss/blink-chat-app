type RemapField<
  Base extends Record<string, unknown>,
  Remap extends Partial<Record<keyof Base, unknown>>,
> = Omit<Base, keyof Remap> & Remap;

export type Message = {
  id: string;
  text: string; // Message content
  last_updated: Date; // Use to sort messages
};

export type Conversation = {
  id: string;
  name: string; // Conversation name
  last_updated: Date; // Use to sort conversation list
  messages: Message[];
};

export type DryMessage = RemapField<
  Message,
  {
    last_updated: string;
  }
>;

export type DryConversation = RemapField<
  Conversation,
  {
    last_updated: string;
    messages: DryMessage[];
  }
>;
