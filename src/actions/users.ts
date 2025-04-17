"use server";
import { neon } from "@neondatabase/serverless";
import { getUserFromServer } from "./profile";


export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    courses: number;
}

export async function getData(): Promise<User[]> {
    const user = getUserFromServer()
    const currentUserId = user?.id
    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.role,
        (
          SELECT COUNT(*) 
          FROM "Course" c 
          WHERE c."educatorId" = u.id
        ) AS courses
      FROM "User" u
      WHERE u.id != ${currentUserId}
    `;

    return data.map((row) => ({
        id: Number(row.id),
        name: String(row.name),
        email: String(row.email),
        role: String(row.role),
        courses: Number(row.courses),
    }));
}



export async function assignRole(userId: number, newRole: 'STUDENT' | 'EDUCATOR' | 'ADMIN') {
    const sql = neon(process.env.DATABASE_URL!);

    try {
        const result = await sql`
      UPDATE "User"
      SET role = ${newRole}::"Role"
      WHERE id = ${userId}
    `;
        return { success: true };
    } catch (error) {
        console.error("Role assignment failed", error);
        return { success: false, message: "Role assignment failed", error };
    }
}


export async function profileDetails() {
try {
    const user = getUserFromServer()
    const me = user?.id
    const sql = neon(process.env.DATABASE_URL!);
    const data = await sql`
        SELECT 
          u.id,
          u.name,
          u.email,
          u.role
        FROM "User" u
        WHERE u.id = ${me}`
        return data
} catch (error) {
  console.log("profileDetails error: ",error)
}
}