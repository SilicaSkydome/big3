interface IRequestBaseBody {
    method: string,
    body?: {}
}
interface RequestGenericType {
    body: {},
    status: number
}

const base = 'http://dev.trainee.dex-it.ru/api';

const request = async (url: string, data: IRequestBaseBody, token: string | undefined): Promise<any> => {
  const headersForToken = token
    ? {
      Authorization: `Bearer ${token}`,
    } : { };

  const headerForMultiPart = typeof data.body === 'string' ? {
    'Content-Type': 'application/json;charset=utf-8',
  } : {};

  const response = await fetch(url, {
    ...data,
    // @ts-ignore
    headers: {
      ...headersForToken,
      ...headerForMultiPart,
    },
  });

  if (response.ok) {
    if (response.headers.get('Content-Length') === '0') {
      return true;
    }
    const typeResponse = response.headers.get('Content-Type');
    let result;
    if (typeResponse === 'application/text') {
      result = await response.text();
      return result;
    }
    result = await response.json();

    return result;

  }

  throw { isCustomError: true, status: response.status };

};

export const get = (url: string, token?: string) => request(`${base}${url}`, { method: 'GET' }, token);

export function post(url: string, body: {}, token?: string) {
  return request(`${base}${url}`, { method: 'POST', body }, token);
}

export const remove = (url: string, token: string) => request(`${base}${url}`, { method: 'DELETE' }, token);

export function put(url: string, body: {}, token: string) {
  return request(`${base}${url}`, { method: 'PUT', body }, token);
}