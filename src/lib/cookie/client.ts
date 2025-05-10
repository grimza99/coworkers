export function getClientCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setClientCookie(
  name: string,
  value: string,
  options: Record<string, unknown> = {}
) {
  options = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  for (const key in options) {
    updatedCookie += `; ${key}`;
    const val = options[key];
    if (val !== true) {
      updatedCookie += `=${val}`;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteClientCookie(name: string) {
  setClientCookie(name, '', { 'max-age': '0' });
}
