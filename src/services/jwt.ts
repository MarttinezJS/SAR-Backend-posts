import { existsSync, mkdirSync, readFileSync } from "fs";
import { importSPKI, JWTPayload, jwtVerify, JWTVerifyResult } from "jose";
import { getAbsolutePath } from "../helpers/getAbsolutePath";
const dir = getAbsolutePath() + "/generated/jwk";
if (!existsSync(dir)) {
  mkdirSync(dir, { recursive: true });
}
export const decodeJwt = async (
  token: string,
  algorithm = "RS256"
): Promise<JWTVerifyResult<JWTPayload & { data?: any }>> => {
  const key = JSON.parse(
    readFileSync(`${dir}/jwk-meta.json`).toString()
  )?.publicKeyPem;
  if (!key) throw new Error("No se encontró la llave pública");
  const publicKey = await importSPKI(key, algorithm);
  const decryptedToken = await jwtVerify(token, publicKey);
  return decryptedToken;
};
