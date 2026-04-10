import { Link, usePage } from '@inertiajs/react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { index } from '@/routes/admin/notifications';

interface SharedProps {
    unreadNotifications?: number;
    [key: string]: unknown;
}

export function NotificationBell() {
    const { unreadNotifications } = usePage<SharedProps>().props;
    const count = unreadNotifications ?? 0;

    return (
        <Link href={index()}>
            <Button
                variant="ghost"
                size="icon"
                className="relative h-8 w-8"
                aria-label={`Notifications${count > 0 ? ` — ${count} unread` : ''}`}
            >
                <Bell className="h-4 w-4" />
                {count > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                        {count > 99 ? '99+' : count}
                    </span>
                )}
            </Button>
        </Link>
    );
}
