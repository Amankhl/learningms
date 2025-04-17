"use server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

export async function login({ email, password }: { email: string, password: string }) {
    try {
        const sql = neon(process.env.DATABASE_URL!);
        const data = await sql`SELECT * FROM "User" WHERE "email" = ${email}`;
        if (data.length === 0) {
            return {message: "User not found with this email"};
        }
        const dbUser = data[0];
        //user verification TODO
        const isPasswordCorrect = await bcrypt.compare(password, dbUser.password);
        if (!isPasswordCorrect) {
            return { success: false, message: 'Incorrect password' };
        }
        interface TokenData {
            id: number;
            name: string;
            email: string;
            role: string
        }
        const tokenData: TokenData = {
            id: dbUser.id,
            name: dbUser.name,
            email: dbUser.email,
            role: dbUser.role
        }
        // console.log(tokenData)
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
        const response = { success: true, message: 'Login successful' };
        const cookieStore = await cookies()
        cookieStore.set("lms-token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        return response;
    } catch (error) {
        console.error("Failed to login ", error);
        return { success: false, message: "Failed to login. " + (error as Error).message, error };
    }
}

export async function register({
    name,
    email,
    role,
    password,
  }: {
    name: string;
    email: string;
    password: string;
    role: 'STUDENT' | 'TEACHER';
  }) {
    try {
      const sql = neon(process.env.DATABASE_URL!);
  
      const data = await sql`SELECT * FROM "User" WHERE "email" = ${email}`;
      if (data.length !== 0) {
        return {
          success: false,
          message: "User already exists",
        };
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await sql`
        INSERT INTO "User" (name, email, password, role)
        VALUES (${name}, ${email}, ${hashedPassword}, ${role}::"Role")`;
  
      // console.log("User registered: ", newUser);
  
      return {
        success: true,
        message: "User registered successfully",
      };
    } catch (error) {
      console.error("Failed to register", error);
      return {
        success: false,
        message: "Failed to register. " + (error as Error).message,
        error,
      };
    }
  }
  