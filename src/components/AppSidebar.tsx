'use client'
import React from 'react'
import { Cog,ScrollText,Users,Bell,Calendar, LayoutDashboard, Inbox, Search, Settings } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';
import { useProfile } from '@/context/ProfileContext';


const learn = [
    { title: 'Courses', url: '/', icon: Inbox },
    // { title: 'Certifications', url: '#', icon: Calendar },
    // { title: 'Guides', url: '#', icon: Search },
    // { title: 'Quiz', url: '#', icon: Settings },
  ];
  const account = [
    { title: 'Settings', url: '#', icon: Settings },
    { title: 'Notifications', url: '#', icon: Bell },
  ];
  const admin = [
    { title: 'Users', url: '/Users', icon: Users },
    { title: 'Upload Course', url: '/UploadCourses', icon: ScrollText },
    // { title: 'Configurations', url: '#', icon: Cog },
  ];

const AppSidebar = () => {
      const {user} = useProfile();
      if (!user) return null;

      const isStudent = user.role === 'STUDENT';
      const isEducator = user.role === 'EDUCATOR';
      const isAdmin = user.role === 'ADMIN';
    
    return (
        <Sidebar>
        <SidebarContent>
          <SidebarGroup className="space-y-4">
            {(isStudent || isEducator || isAdmin) && (
              <>
                <SidebarGroupLabel>LEARN</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {learn.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link href={item.url} className="flex items-center gap-2">
                            <item.icon size={18} />
                            <span className="font-semibold text-[1rem]">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </>
            )}
  
            {/* {(isStudent || isEducator) && (
              <>
                <SidebarGroupLabel>ACCOUNT</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {account && account?.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link href={item.url} className="flex items-center gap-2">
                            <item.icon size={18} />
                            <span className="font-semibold text-[1rem]">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </>
            )} */}
  
            {(isEducator || isAdmin) && (
              <>
                <SidebarGroupLabel>ADMINISTRATION</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {(isAdmin || isEducator) && (
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <Link href="/Dashboard" className="flex items-center gap-2">
                            <LayoutDashboard size={18} />
                            <span className="font-semibold text-[1rem]">Dashboard</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )}
  
                    {admin
                      .filter((item) => isAdmin || item.title === 'Upload Course')
                      .map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton asChild>
                            <Link href={item.url} className="flex items-center gap-2">
                              <item.icon size={18} />
                              <span className="font-semibold text-[1rem]">{item.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </>
            )}
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    )
}

export default AppSidebar