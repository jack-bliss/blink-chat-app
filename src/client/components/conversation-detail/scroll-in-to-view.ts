import { MutableRef } from 'preact/hooks';

export function scrollInToView(ref: MutableRef<HTMLDivElement | null>) {
  setTimeout(() => {
    if (!(ref.current instanceof HTMLDivElement)) {
      return;
    }
    ref.current.scrollIntoView();
  });
}
