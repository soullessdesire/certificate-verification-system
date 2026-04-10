import { usePage } from '@inertiajs/react';
import { NotificationBell } from '@/components/dashboard/notification-bell';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType, User } from '@/types';

interface AppHeaderLayoutProps {
    breadcrumbs?: BreadcrumbItemType[];
}

interface SharedProps {
    auth: { user: User, is_admin: boolean, is_issuer: boolean };
    [key: string]: unknown;
}

export function AppHeaderLayout({ breadcrumbs = [] }: AppHeaderLayoutProps) {
    const { auth } = usePage<SharedProps>().props;
    const isAdmin = auth.is_admin;

    console.log(isAdmin)

    return (
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background px-4">
            {/* Left — sidebar toggle + breadcrumbs */}
            <div className="flex flex-1 items-center gap-2 overflow-hidden">
                <SidebarTrigger className="-ml-1" />

                {breadcrumbs.length > 0 && (
                    <>
                        <Separator orientation="vertical" className="mx-1 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                {breadcrumbs.map((crumb, i) => {
                                    const isLast = i === breadcrumbs.length - 1;

                                    return (
                                        <span key={crumb.href} className="flex items-center gap-1.5">
                                            {i > 0 && <BreadcrumbSeparator />}
                                            <BreadcrumbItem>
                                                {isLast ? (
                                                    <BreadcrumbPage className="truncate max-w-[160px]">
                                                        {crumb.title}
                                                    </BreadcrumbPage>
                                                ) : (
                                                    <BreadcrumbLink href={crumb.href} className="truncate max-w-[120px]">
                                                        {crumb.title}
                                                    </BreadcrumbLink>
                                                )}
                                            </BreadcrumbItem>
                                        </span>
                                    );
                                })}
                            </BreadcrumbList>
                        </Breadcrumb>
                    </>
                )}
            </div>

            {/* Right — notification bell (admin only) */}
            {isAdmin && (
                <div className="flex shrink-0 items-center">
                    <NotificationBell />
                </div>
            )}
        </header>
    );
}