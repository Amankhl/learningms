'use client'
import { ReactNode } from "react"
import { ProfileContext, UserPayload } from "./ProfileContext"

export default function ProfileProvider({
  user,
  children
}: {
  user: UserPayload | null
  children: ReactNode
}) {
  return (
    <ProfileContext.Provider value={user}>
      {children}
    </ProfileContext.Provider>
  )
}
