import { cookies } from 'next/headers';

export async function getCookieInServer(name: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get(name)?.value;

  return token;
}

export async function setCookieInServer(name: string, item: string) {
  const cookieStore = await cookies();
  const token = cookieStore.set(name, item);

  return token;
}
