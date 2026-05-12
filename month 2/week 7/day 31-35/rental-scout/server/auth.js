import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scryptAsync(password, salt, 64);

  return `${salt}:${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password, passwordHash) {
  const [salt, storedKey] = passwordHash.split(":");
  const derivedKey = await scryptAsync(password, salt, 64);
  const storedKeyBuffer = Buffer.from(storedKey, "hex");

  return timingSafeEqual(derivedKey, storedKeyBuffer);
}
