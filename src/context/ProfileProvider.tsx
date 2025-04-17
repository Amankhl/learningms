'use client'
import { ReactNode } from "react"
import { ProfileContext, UserPayload } from "./ProfileContext"

export default function ProfileProvider({
  user,
  logout,
  children
}: {
  user: UserPayload | null;
  logout: () => void;
  children: ReactNode;
}) {

  return (
    <ProfileContext.Provider value={{ user, logout }}>
      {children}
    </ProfileContext.Provider>
  )
}
