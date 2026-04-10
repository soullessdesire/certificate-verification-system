// resources/js/pages/admin/verification-logs.tsx

import { ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { StatusBadge } from '@/components/status-badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { admin } from '@/routes';
import { verification } from '@/routes/admin';
import type { VerificationLog } from '@/types';

interface VerificationLogsProps { logs: VerificationLog[] }

const breadcrumbs = [
    { title: 'Dashboard',          href: admin().url        },
    { title: 'Verification Logs',  href: verification().url },
];

export default function VerificationLogs({ logs }: VerificationLogsProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">
                <PageHeader
                    title="Verification Logs"
                    description="All certificate verification requests made through the system."
                    icon={ShieldCheck}
                />
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">All Verification Requests</CardTitle>
                        <CardDescription>{logs.length} total records.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Certificate Holder</TableHead>
                                    <TableHead>Certificate ID</TableHead>
                                    <TableHead>IP Address</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Verified At</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logs.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                                            No verification logs yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    logs.map((log) => (
                                        <TableRow key={log.id}>
                                            <TableCell className="font-medium">{log?.certificate?.name}</TableCell>
                                            <TableCell className="font-mono text-xs text-muted-foreground">
                                                {log?.certificate_id?.slice(0, 8)}…
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {log.ip_address ?? '—'}
                                            </TableCell>
                                            <TableCell><StatusBadge status={log.status} /></TableCell>
                                            <TableCell className="text-right text-xs text-muted-foreground">
                                                {new Date(log.created_at).toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' })}
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