export const TEMP_LOGIN_ID = "cheongyeon";
export const TEMP_LOGIN_PASSWORD = "tea1234";

export function validateTempLogin(loginId: string, password: string) {
  return loginId === TEMP_LOGIN_ID && password === TEMP_LOGIN_PASSWORD;
}
