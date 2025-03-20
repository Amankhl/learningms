import React from 'react'
import { Cog,ScrollText,Users,Bell,Calendar, LayoutDashboard, Inbox, Search, Settings } from 'lucide-react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';


const learn = [
    { title: 'Dashboard', url: '/Dashboard', icon: LayoutDashboard },
    { title: 'Courses', url: '/', icon: Inbox },
    { title: 'Certifications', url: '#', icon: Calendar },
    { title: 'Guides', url: '#', icon: Search },
    { title: 'Quiz', url: '#', icon: Settings },
  ];
  const account = [
      { title: 'Settings', url: '#', icon: Settings },
    { title: 'Notifications', url: '#', icon: Bell },
  ];
  const admin = [
    { title: 'Users', url: '/Users', icon: Users },
    { title: 'Content', url: '/Content', icon: ScrollText },
    { title: 'Configurations', url: '#', icon: Cog },
  ];

const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup className='space-y-4'>
                    <SidebarGroupLabel>LEARN</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {learn.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className="flex items-center gap-2">
                                            <item.icon size={18} />
                                            <span className='font-semibold text-[1rem]'>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                    <SidebarGroupLabel>ACCOUNT</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {account.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className="flex items-center gap-2">
                                            <item.icon size={18} />
                                            <span className='font-semibold text-[1rem]'>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                    <SidebarGroupLabel>ADMINISTRATION</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {admin.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className="flex items-center gap-2">
                                            <item.icon size={18} />
                                            <span className='font-semibold text-[1rem]'>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar