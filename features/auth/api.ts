const serverUrl = "http://52.79.233.120:8080";

export async function checkEmailAvailability({ email }: { email: string }) {
  const response = await fetch(
    `${serverUrl}/api/auth/check-email?email=${email}`
  );
  if (!response.ok) {
    const error = new Error("이메일 중복체크 서버에러");
    // error.code = response.status;
    // error.info = await response.json();
    throw error;
  }

  const data = await response.json();
  console.log(data);
}
