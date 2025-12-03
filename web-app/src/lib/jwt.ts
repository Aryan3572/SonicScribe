import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET: jwt.Secret =
  process.env.JWT_SECRET || "your-secret-key";

export function signJwt(
  payload: object,
  expiresIn: SignOptions["expiresIn"] = "1h"
) {
  const options: SignOptions = {
    expiresIn,
  };

  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
