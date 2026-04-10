// resources/js/pages/admin/dashboard.tsx

import {
    FileBadge2,
    ScanLine,
    ShieldX,
    LayoutGrid,
    ShieldCheck,
    ShieldAlert,
    Activity,
} from 'lucide-react';

import { PageHeader } from '@/components/dashboard/page-header';
import { StatCard } from '@/components/stat-card';
import { StatusBadge } from '@/components/status-badge';
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
import type { VerificationLog, AuditLog, AdminStats } from '@/types';

// ── Breadcrumb items ──────────────────────────────────────────────────────────

const breadcrumbs = [{ title: 'Dashboard', href: '/admin/dashboard' }];

// ── Interface ────────────────────────────────────────────────────────────────
interface AdminDashboardProps {
    stats: AdminStats;
    recent_verifications: VerificationLog[];
    recent_activity: AuditLog[];
}

// ── Component ────────────────────────────────────────────────────────────────

export default function Dashboard({
    stats,
    recent_verifications,
    recent_activity,
}: AdminDashboardProps) {
    console.log(recent_activity, recent_verifications);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">
                <PageHeader
                    title="Admin Dashboard"
                    description="Platform overview and recent activity."
                    icon={LayoutGrid}
                />

                {/* ── Stat cards ── */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        title="Total Certificates Issued"
                        value={stats.total_certificates}
                        icon={FileBadge2}
                        description="All time"
                    />
                    <StatCard
                        title="Verification Requests"
                        value={stats.verification_requests_24h}
                        icon={ScanLine}
                        description="Last 24 hours"
                        iconClassName="bg-blue-50 dark:bg-blue-950"
                    />
                    <StatCard
                        title="Revoked Certificates"
                        value={stats.revoked_certificates}
                        icon={ShieldX}
                        description="All time"
                        iconClassName="bg-red-50 dark:bg-red-950"
                    />
                </div>

                {/* ── Bottom row ── */}
                <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
                    {/* Recent Verifications */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                <CardTitle className="text-base">
                                    Recent Verifications
                                </CardTitle>
                            </div>
                            <CardDescription>
                                Latest certificate verification requests.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            Certificate Holder
                                        </TableHead>
                                        <TableHead>Certificate ID</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">
                                            Verified At
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recent_verifications.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="py-10 text-center text-sm text-muted-foreground"
                                            >
                                                No verification requests yet.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        recent_verifications.map((v) => (
                                            <TableRow key={v.id}>
                                                <TableCell className="font-medium">
                                                    {v?.certificate?.name}
                                                </TableCell>
                                                <TableCell className="font-mono text-xs text-muted-foreground">
                                                    {v.certificate_id?.slice(
                                                        0,
                                                        8,
                                                    )}
                                                    …
                                                </TableCell>
                                                <TableCell>
                                                    <StatusBadge
                                                        status={v.status}
                                                    />
                                                </TableCell>
                                                <TableCell className="text-right text-xs text-muted-foreground">
                                                    {new Date(
                                                        v.created_at,
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

                    {/* Recent System Activity */}
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <Activity className="h-4 w-4 text-primary" />
                                <CardTitle className="text-base">
                                    System Activity
                                </CardTitle>
                            </div>
                            <CardDescription>
                                Recent actions across the platform.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recent_activity.length === 0 ? (
                                <p className="py-8 text-center text-sm text-muted-foreground">
                                    No recent activity.
                                </p>
                            ) : (
                                <ol className="space-y-4">
                                    {recent_activity.map((log) => (
                                        <li
                                            key={log.id}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted">
                                                <ShieldAlert className="h-3.5 w-3.5 text-muted-foreground" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm leading-none font-medium text-foreground">
                                                    {log.description}
                                                </p>
                                                <p className="mt-1 text-xs text-muted-foreground">
                                                    {log.user?.name} &middot;{' '}
                                                    {new Date(
                                                        log.created_at,
                                                    ).toLocaleString('en-KE', {
                                                        dateStyle: 'short',
                                                        timeStyle: 'short',
                                                    })}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
