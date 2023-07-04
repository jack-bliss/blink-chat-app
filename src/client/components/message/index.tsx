import { format } from 'date-fns';
import { Message } from '../../../types';

export function Message({ message }: { message: Message }) {
  return (
    <div className="message">
      <h4>{format(message.last_updated, 'EEEE do LLLL hh:mm:ss')}</h4>
      <p>{message.text}</p>
    </div>
  );
}
