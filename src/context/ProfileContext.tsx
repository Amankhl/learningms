'use client'
import { createContext, useContext } from "react";

export interface UserPayload {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const ProfileContext = createContext<UserPayload | null>(null)
export const useProfile = () => useContext(ProfileContext)
