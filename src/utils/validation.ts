export function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

/** 숫자·하이픈만 허용, 자리수·형식 검사 */
export function isValidPhone(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return false;
  }

  if (!/^[\d-]+$/.test(trimmed)) {
    return false;
  }

  const digits = normalizePhone(trimmed);

  if (!/^01[016789]\d{7,8}$/.test(digits)) {
    return false;
  }

  if (trimmed.includes("-")) {
    return /^01[016789]-\d{3,4}-\d{4}$/.test(trimmed);
  }

  return digits.length === 10 || digits.length === 11;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const HANGUL_JAMO_PATTERN = /[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F]/;

/** 완성형 한글(2~10자) 또는 영문(2~20자)만 허용 */
export function isValidReserverName(value: string) {
  const trimmed = value.trim();

  if (!trimmed || HANGUL_JAMO_PATTERN.test(trimmed)) {
    return false;
  }

  return /^[가-힣]{2,10}$/.test(trimmed) || /^[a-zA-Z]{2,20}$/.test(trimmed);
}

export function sanitizeReserverNameInput(value: string) {
  return value.replace(/[^가-힣a-zA-Z]/g, "");
}

export function sanitizePhoneInput(value: string) {
  return value.replace(/[^\d-]/g, "");
}
