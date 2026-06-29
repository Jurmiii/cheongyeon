export const ACCOUNTS_STORAGE_KEY = "cheongyeon-accounts";

export interface StoredAccount {
  loginId: string;
  password: string;
  name: string;
  phone: string;
  email: string;
  birth?: string;
}

function readAccounts(): Record<string, StoredAccount> {
  const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);

  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, StoredAccount>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeAccounts(accounts: Record<string, StoredAccount>) {
  localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
}

export function getAccount(loginId: string): StoredAccount | null {
  return readAccounts()[loginId] ?? null;
}

export function hasAccount(loginId: string): boolean {
  return Boolean(readAccounts()[loginId]);
}

export function saveAccount(account: StoredAccount) {
  const accounts = readAccounts();
  accounts[account.loginId] = account;
  writeAccounts(accounts);
}

export function validateAccount(loginId: string, password: string): boolean {
  const account = readAccounts()[loginId];
  return Boolean(account) && account.password === password;
}
