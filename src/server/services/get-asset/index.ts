import { json } from 'body-parser';
import { getFromBucket } from './get-from-bucket';
import { getFromLocal } from './get-from-local';

export function getAsset(path: string) {
  if (process.env.NODE_ENV === 'production') {
    return getFromBucket(path);
  }
  return getFromLocal(path);
}

export async function getJsonAsset<T>(path: string): Promise<T> {
  const asset = await getAsset(path);
  return JSON.parse(asset.toString()) as T;
}
