// resources/js/components/admin-sidebar.tsx

import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    Users,
    ClipboardList,
    ShieldCheck,
    BookOpen,
    LifeBuoy,
} from 'lucide-react';

import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { admin } from '@/routes';
import { users, verification, audit } from '@/routes/admin';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', href: admin(), icon: LayoutGrid },
    { title: 'Users', href: users(), icon: Users },
    { title: 'Verification Logs', href: verification(), icon: ShieldCheck },
    { title: 'Audit Logs', href: audit(), icon: ClipboardList },
    // { title: 'Reports',            href: reports(),            icon: BarChart3     },
];

const footerNavItems: NavItem[] = [
    { title: 'Help & Support', href: '/contact', icon: LifeBuoy },
    {
        title: 'Documentation',
        href: 'https://docs.must.ac.ke/certverify',
        icon: BookOpen,
    },
];

export function AdminSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
