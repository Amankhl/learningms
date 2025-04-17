'use client'
import { createContext, useContext } from "react";

export interface UserPayload {
  id: number;
  name: string;
  email: string;
  role: string;
}
export interface ProfileContextType {
  user: UserPayload | null;
  logout: () => void;
}

const defaultContext: ProfileContextType = {
  user: null,
  logout: () => {},
};
export const ProfileContext = createContext<ProfileContextType>(defaultContext);
export const useProfile = () => useContext(ProfileContext);
