"use client";
import React from 'react'
import { WorkflowIcon, Settings } from "lucide-react"
import { 
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger 
} from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import { usePathname, useRouter } from 'next/navigation';

const AppSiderbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    
    const navItems = [
        {
            title: "Workflows",
            url: "/workflow",
            icon: WorkflowIcon,
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings,
        },
    ];

  return (
    <Sidebar>
        <SidebarHeader className="flex flex-row items-center justify-between px-4">
            <Logo />
            <SidebarTrigger />
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                {navItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                            isActive={pathname === item.url}
                            className="data-[active=true]:bg-primary/10 hover:bg-primary/10"
                            onClick={() => router.push(item.url)}
                        >
                            <item.icon />
                            <span className="font-medium">{item.title}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarContent>
    </Sidebar>
  )
}

export default AppSiderbar;