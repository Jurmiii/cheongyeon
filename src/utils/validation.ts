export function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

/** 입력 중 휴대전화 번호에 하이픈을 자동 삽입합니다. */
export function formatPhoneInput(value: string) {
  const digits = normalizePhone(value).slice(0, 11);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  if (digits.length <= 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
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

const HANGUL_JAMO_PATTERN = /[\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]/;
const RESERVER_NAME_INPUT_PATTERN = /[^가-힣a-zA-Z\u1100-\u11FF\u3130-\u318F\uA960-\uA97F\uD7B0-\uD7FF]/g;
const RESERVER_NAME_NORMALIZE_PATTERN = /[^가-힣a-zA-Z]/g;

/** 완성형 한글(2~10자) 또는 영문(2~20자)만 허용 */
export function isValidReserverName(value: string) {
  const trimmed = value.trim();

  if (!trimmed || HANGUL_JAMO_PATTERN.test(trimmed)) {
    return false;
  }

  return /^[가-힣]{2,10}$/.test(trimmed) || /^[a-zA-Z]{2,20}$/.test(trimmed);
}

/** 입력 중 IME 조합 자모를 유지합니다. */
export function sanitizeReserverNameInput(value: string) {
  return value.replace(RESERVER_NAME_INPUT_PATTERN, "");
}

/** blur·제출 시 조합 중 자모를 제거합니다. */
export function normalizeReserverName(value: string) {
  return value.replace(RESERVER_NAME_NORMALIZE_PATTERN, "");
}

export function sanitizePhoneInput(value: string) {
  return value.replace(/[^\d-]/g, "");
}
