import { ClipboardList } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { admin } from '@/routes';
import { audit } from '@/routes/admin';
import type { AuditLog } from '@/types';

interface AuditLogsProps {
    logs: AuditLog[];
}

const breadcrumbs = [
    { title: 'Dashboard', href: admin().url },
    { title: 'Audit Logs', href: audit().url },
];

export default function AuditLogs({ logs }: AuditLogsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">
                <PageHeader
                    title="Audit Logs"
                    description="A complete record of all administrative and user actions."
                    icon={ClipboardList}
                />
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">All Actions</CardTitle>
                        <CardDescription>
                            {logs.length} log entries.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead className="text-right">
                                        Timestamp
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="py-10 text-center text-sm text-muted-foreground"
                                        >
                                            No audit logs found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    logs.map((log) => (
                                        <TableRow key={log.id}>
                                            <TableCell className="font-medium">
                                                {log.user?.name}
                                            </TableCell>
                                            <TableCell>
                                                <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
                                                    {log.action}
                                                </span>
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate text-sm text-muted-foreground">
                                                {log.description}
                                            </TableCell>
                                            <TableCell className="text-right text-xs text-muted-foreground">
                                                {new Date(
                                                    log.created_at,
                                                ).toLocaleString('en-KE', {
                                                    dateStyle: 'medium',
                                                    timeStyle: 'short',
                                                })}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
