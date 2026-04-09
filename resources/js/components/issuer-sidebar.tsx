import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    FileBadge2,
    ShieldCheck,
    LifeBuoy,
    BookOpen,
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
import { issuer } from '@/routes';
import certificates from '@/routes/certificates';
import { index as verify } from '@/routes/verify';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    { title: 'Dashboard',         href: issuer().url,                      icon: LayoutGrid    },
    { title: 'Certificates',      href: certificates.index.get().url ,     icon: FileBadge2    },
    { title: 'Verify Certificate', href: verify().url,                     icon: ShieldCheck   },
];

const footerNavItems: NavItem[] = [
    { title: 'Help & Support', href: '/contact',                           icon: LifeBuoy },
    { title: 'Documentation',  href: 'https://docs.must.ac.ke/certverify', icon: BookOpen },
];

export function IssuerSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/issuer/dashboard" prefetch>
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