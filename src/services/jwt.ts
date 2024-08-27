import { importSPKI, JWTPayload, jwtVerify, JWTVerifyResult } from "jose";

export const decodeJwt = async (
  token: string,
  algorithm = "RS256"
): Promise<JWTVerifyResult<JWTPayload & { data?: any }>> => {
  let key = process.env.pk_pem;
  if (!key) throw new Error("No se encontró la llave pública");
  const publicKey = await importSPKI(key, algorithm);
  const decryptedToken = await jwtVerify(token, publicKey);
  return decryptedToken;
};
