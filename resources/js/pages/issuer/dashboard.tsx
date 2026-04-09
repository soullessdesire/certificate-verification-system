import { Link } from '@inertiajs/react';
import {
    FileBadge2,
    Clock,
    ScanLine,
    LayoutGrid,
    ShieldCheck,
    Plus,
} from 'lucide-react';

import { PageHeader } from '@/components/dashboard/page-header';
import { StatCard } from '@/components/stat-card';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
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
import { issuer } from '@/routes';
import type { IssuerStats, Certificate } from '@/types';

const breadcrumbs = [{ title: 'Dashboard', href: issuer().url }];

interface IssuerDashboardProps {
    stats: IssuerStats;
    recent_certificates: Certificate[];
}

export default function IssuerDashboard({ stats, recent_certificates }: IssuerDashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">

                <PageHeader
                    title="Issuer Dashboard"
                    description="Manage and track certificates you have issued."
                    icon={LayoutGrid}
                    actions={
                        <Link href="/issuer/certificates/create">
                            <Button size="sm" className="gap-2">
                                <Plus className="h-4 w-4" />
                                Issue Certificate
                            </Button>
                        </Link>
                    }
                />

                {/* ── Stat cards ── */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        title="Certificates Issued"
                        value={stats.certificates_issued}
                        icon={FileBadge2}
                        description="All time"
                    />
                    <StatCard
                        title="Revoked Certificates"
                        value={stats.revoked_certificates}
                        icon={Clock}
                        description="Awaiting issuance"
                        iconClassName="bg-amber-50 dark:bg-amber-950"
                    />
                    <StatCard
                        title="Verification Requests"
                        value={stats.verification_requests}
                        icon={ScanLine}
                        description="All time"
                        iconClassName="bg-blue-50 dark:bg-blue-950"
                    />
                </div>

                {/* ── Recent certificates table ── */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                <div>
                                    <CardTitle className="text-base">Recent Certificates</CardTitle>
                                    <CardDescription>
                                        The most recently issued certificates.
                                    </CardDescription>
                                </div>
                            </div>
                            <Link href="/issuer/certificates">
                                <Button variant="outline" size="sm">
                                    View All
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Graduate Name</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Issue Date</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recent_certificates.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={4}
                                            className="py-10 text-center text-sm text-muted-foreground"
                                        >
                                            No certificates issued yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    recent_certificates.map((cert) => (
                                        <TableRow key={cert.id}>
                                            <TableCell className="font-medium">
                                                {cert.name}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {cert.course}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {new Date(cert.issued_at).toLocaleDateString('en-KE', {
                                                    dateStyle: 'medium',
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge status={cert.status} />
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