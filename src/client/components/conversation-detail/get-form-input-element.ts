export function getFormInputElement(
  form: EventTarget | null,
  name: string,
) {
  if (!(form instanceof HTMLFormElement)) {
    throw new Error(`Event target was not a form element`);
  }
  const input = form.elements.namedItem(name);
  if (!(input instanceof HTMLInputElement)) {
    throw new Error(`No input element was found`);
  }
  return input;
}
