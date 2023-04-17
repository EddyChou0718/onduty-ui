import type { MethodType, PayloadType } from '@/types';

/**
 * fetch api
 *
 * @param method fetch method
 * @param api API Route
 * @param body API body
 * @param text is return text
 * @returns promise response
 */
const request = async (
  method: MethodType,
  api: string,
  body?: any,
  text?: boolean,
): Promise<any> => {
  let url = `http://localhost:3003${api}`;

  if (method === 'GET' && body) {
    url += `?${new URLSearchParams(body)}`;
  }

  const payload: PayloadType = {
    method,
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (method !== 'GET' && body) {
    payload.body = JSON.stringify(body);
  }

  return fetch(url, payload).then((res) => {
    if (text) {
      return res.text();
    }
    return res.json();
  });
};

export default request;
