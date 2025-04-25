'use server';
export default async function login(_: unknown, formData: FormData) {
  const credentials = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const response = await fetch(`${process.env.API_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  // @TODO: 응답 에러 처리
  const isOk = response.ok;
  // const status = response.status;
  // const data = await response.json();

  // @TODO: 유저 데이터, 인증 토큰 처리
  const setUserData = () => {
    // console.log(data);

    return { success: isOk };
  };

  const result = setUserData();

  return result;
}
