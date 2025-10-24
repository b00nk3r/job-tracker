import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
const scrypt = promisify(_scrypt);

export type User = {
  id: string;
  email: string;
  saltB64: string;
  hashB64: string;
};

const usersByEmail = new Map<string, User>();          // email -> user
const sessions = new Map<string, string>();            // sid -> email

function uuid() {
  // Simple UUID-ish for demo
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

export async function hashPassword(password: string, salt?: Buffer) {
  const _salt = salt ?? randomBytes(16);
  const derived = (await scrypt(password, _salt, 64)) as Buffer;
  return { saltB64: _salt.toString("base64"), hashB64: derived.toString("base64") };
}

export async function createUser(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  if (usersByEmail.has(normalized)) throw new Error("UserExists");
  const { saltB64, hashB64 } = await hashPassword(password);
  const user: User = { id: uuid(), email: normalized, saltB64, hashB64 };
  usersByEmail.set(normalized, user);
  return user;
}

export async function verifyUser(email: string, password: string) {
  const normalized = email.trim().toLowerCase();
  const user = usersByEmail.get(normalized);
  if (!user) return null;
  const salt = Buffer.from(user.saltB64, "base64");
  const { hashB64 } = await hashPassword(password, salt);
  return hashB64 === user.hashB64 ? user : null;
}

export function createSession(email: string) {
  const sid = uuid();
  sessions.set(sid, email.trim().toLowerCase());
  return sid;
}

export function getUserBySession(sid: string | undefined | null) {
  if (!sid) return null;
  const email = sessions.get(sid);
  if (!email) return null;
  return usersByEmail.get(email) ?? null;
}

export function deleteSession(sid: string | undefined | null) {
  if (!sid) return;
  sessions.delete(sid);
}
