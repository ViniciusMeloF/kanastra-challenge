/* eslint-disable */
export const debounce = <F extends (...args: any[]) => void>(
  func: Function,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};
