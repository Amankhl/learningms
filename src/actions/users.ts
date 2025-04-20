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


export const markAttendance = async (): Promise<{
  success: boolean
  message?: string
  data?: any
}> => {
  try {
    const user = await getUserFromServer()
    if (!user || !['STUDENT', 'ADMIN', 'EDUCATOR'].includes(user.role)) {
      return { success: false, message: 'Unauthorized' }
    }

    const sql = neon(process.env.DATABASE_URL!)

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Step 1: Check if attendance already exists
    const result = await sql`
  SELECT * FROM "Attendance"
  WHERE "userId" = ${user.id} AND "date" >= ${today.toISOString()}
`

    if (result.length > 0) {
      return {
        success: true,
        message: 'Already marked',
        data: result[0]
      }
    }

    // Step 2: Insert new attendance record
    const insertResult = await sql`
      INSERT INTO "Attendance" ("userId")
      VALUES (${user.id})
      RETURNING *
    `

    return {
      success: true,
      message: 'Attendance marked',
      data: insertResult[0]
    }
  } catch (error) {
    console.error('markAttendance error:', error)
    return {
      success: false,
      message: 'Internal server error'
    }
  }
}



export const getUserAttendance = async () => {
  const user = await getUserFromServer();
  if (!user || !['STUDENT', 'ADMIN', 'EDUCATOR'].includes(user.role)) {
    return [];
  }

  const sql = neon(process.env.DATABASE_URL!);

  const result = await sql`
    SELECT 
      DATE_TRUNC('month', "date") as month,
      COUNT(*) as days_present
    FROM "Attendance"
    WHERE "userId" = ${user.id} AND "isPresent" = true
    GROUP BY month
    ORDER BY month ASC
  `;

  return result.map((row) => ({
    month: new Date(row.month).toLocaleString('default', { month: 'long' }),
    daysPresent: Number(row.days_present),
  }));
};
