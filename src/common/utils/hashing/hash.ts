import bcrypt from "bcrypt";

export async function hash(plainText: string, salt = Number(process.env.SALT)) {
  return await bcrypt.hash(plainText, salt);
}

export async function compare(plainText: string, hash: string) {
  return await bcrypt.compare(plainText, hash);
}
