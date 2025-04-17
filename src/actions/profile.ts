import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

export interface UserPayload {
  id: number;
  name: string;
  email: string;
  role: string;
}

export function getUserFromServer(): UserPayload | null {
  const token = cookies().get("lms-token")?.value;
  if (!token) return null;

  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET!) as UserPayload;
    return user;
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}

export async function deleteSession() {
  cookies().delete("lms-token");
}
