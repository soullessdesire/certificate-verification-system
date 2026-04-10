import { Link } from '@inertiajs/react';
import {
    Bell,
    Mail,
    MailOpen,
    CheckCheck,
    User,
    Clock,
    Tag,
} from 'lucide-react';

import { markRead } from '@/actions/App/Http/Controllers/ContactMessageController';
import { markAllRead } from '@/actions/App/Http/Controllers/ContactMessageController';
import { PageHeader } from '@/components/dashboard/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    enquiry_type: string;
    message: string;
    read_at: string | null;
    created_at: string;
}

interface PaginatedMessages {
    data: ContactMessage[];
    current_page: number;
    last_page: number;
    total: number;
}

interface NotificationsPageProps {
    messages: PaginatedMessages;
    unreadCount: number;
}

// ── Breadcrumbs ───────────────────────────────────────────────────────────────

const breadcrumbs = [
    { title: 'Dashboard',      href: '/admin/dashboard'      },
    { title: 'Notifications',  href: '/admin/notifications'  },
];

// ── Message Card ──────────────────────────────────────────────────────────────

function MessageCard({ message }: { message: ContactMessage }) {
    const isRead = message.read_at !== null;

    return (
        <div
            className={cn(
                'rounded-xl border p-4 transition-colors',
                isRead
                    ? 'bg-card'
                    : 'border-primary/20 bg-primary/5 dark:bg-primary/10',
            )}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                    {/* Read / unread indicator */}
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                        {isRead ? (
                            <MailOpen className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <Mail className="h-4 w-4 text-primary" />
                        )}
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                        {/* Name + enquiry type */}
                        <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold text-foreground">
                                {message.name}
                            </p>
                            {!isRead && (
                                <span className="h-2 w-2 rounded-full bg-primary" />
                            )}
                            <Badge variant="outline" className="text-[11px]">
                                {message.enquiry_type}
                            </Badge>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <User className="h-3 w-3" />
                            <a
                                href={`mailto:${message.email}`}
                                className="hover:text-foreground hover:underline"
                            >
                                {message.email}
                            </a>
                        </div>

                        {/* Message body */}
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                            {message.message}
                        </p>

                        {/* Timestamp */}
                        <div className="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {new Date(message.created_at).toLocaleString('en-KE', {
                                dateStyle: 'medium',
                                timeStyle: 'short',
                            })}
                            {isRead && message.read_at && (
                                <span className="ml-2 text-muted-foreground/60">
                                    · Read{' '}
                                    {new Date(message.read_at).toLocaleString('en-KE', {
                                        dateStyle: 'short',
                                        timeStyle: 'short',
                                    })}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mark as read action */}
                {!isRead && (
                    <Link
                        href={ markRead({ message: message.id }).url}
                        method="patch"
                        as="button"
                        className="shrink-0"
                    >
                        <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                            <MailOpen className="h-3.5 w-3.5" />
                            Mark read
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NotificationsPage({
    messages,
    unreadCount,
}: NotificationsPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">

                <PageHeader
                    title="Notifications"
                    description="Contact form submissions from students, alumni, and employers."
                    icon={Bell}
                    actions={
                        unreadCount > 0 ? (
                            <Link
                                href={markAllRead().url}
                                method="patch"
                                as="button"
                            >
                                <Button variant="outline" size="sm" className="gap-2">
                                    <CheckCheck className="h-4 w-4" />
                                    Mark all read
                                </Button>
                            </Link>
                        ) : null
                    }
                />

                {/* Summary strip */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">{messages.total}</span>
                        total messages
                    </div>
                    {unreadCount > 0 && (
                        <Badge className="gap-1.5 bg-primary/10 text-primary border-primary/20">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {unreadCount} unread
                        </Badge>
                    )}
                </div>

                {/* Messages list */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Tag className="h-4 w-4 text-primary" />
                            Messages
                        </CardTitle>
                        <CardDescription>
                            Page {messages.current_page} of {messages.last_page}
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        {messages.data.length === 0 ? (
                            <div className="py-12 text-center text-sm text-muted-foreground">
                                No messages yet.
                            </div>
                        ) : (
                            messages.data.map((msg) => (
                                <MessageCard key={msg.id} message={msg} />
                            ))
                        )}
                    </CardContent>
                </Card>

                {/* Pagination
                {messages.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2">
                        {messages.current_page > 1 && (
                            <Link
                                href={`/admin/notifications?page=${messages.current_page - 1}`}
                                // TODO: replace with wayfinder when available
                            >
                                <Button variant="outline" size="sm">Previous</Button>
                            </Link>
                        )}
                        <span className="text-xs text-muted-foreground">
                            {messages.current_page} / {messages.last_page}
                        </span>
                        {messages.current_page < messages.last_page && (
                            <Link
                                href={`/admin/notifications?page=${messages.current_page + 1}`}
                                // TODO: replace with wayfinder when available
                            >
                                <Button variant="outline" size="sm">Next</Button>
                            </Link>
                        )}
                    </div>
                )} */}
            </div>
        </AppLayout>
    );
}