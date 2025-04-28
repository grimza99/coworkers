import { cookies } from 'next/headers';

export async function getServerCookie(name: string) {
  const cookieStore = await cookies();
  const value = cookieStore.get(name)?.value;

  return value;
}

export async function setServerCookie(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value);
}
