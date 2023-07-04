import { StateUpdater, useEffect, useState } from 'preact/hooks';

export function useQuery<T>(query: () => Promise<T>):
  | {
      state: 'loading';
    }
  | {
      state: 'error';
      error: Error;
    }
  | {
      state: 'ready';
      result: T;
      setResult: StateUpdater<T | undefined>;
    } {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );
  const [error, setError] = useState<Error | undefined>(undefined);
  const [result, setResult] = useState<T | undefined>(undefined);
  useEffect(() => {
    (async () => {
      try {
        const result = await query();
        setResult(result);
        setState('ready');
      } catch (error) {
        if (!(error instanceof Error)) {
          throw error;
        }
        setState('error');
        setError(error);
      }
    })();
  }, [query]);

  if (state === 'loading') {
    return { state };
  }
  if (state === 'error' && error instanceof Error) {
    return { state, error };
  }
  if (state === 'ready' && typeof result !== 'undefined') {
    return { state, result, setResult };
  }
  throw new Error(
    `Unexpected state: ${JSON.stringify({ state, error, result })}`,
  );
}
