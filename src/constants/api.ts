const BFF_BASEURL = '/api';
const BACKEND_BASEURL = process.env.NEXT_PUBLIC_API_URL;

export const BFF_API = {
  entry: BFF_BASEURL,
  user: '/user',
};
export const BACKEND_API = {
  user: `${BACKEND_BASEURL}${BFF_API.user}`,
};
