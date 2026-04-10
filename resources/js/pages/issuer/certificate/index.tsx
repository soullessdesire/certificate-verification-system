import { Link } from '@inertiajs/react';
import {
    FileBadge2,
    Plus,
    Eye,
    User,
    GraduationCap,
    CalendarDays,
    Hash,
    ExternalLink,
    Pencil,
    ArrowRight,
} from 'lucide-react';
import { useState } from 'react';

import { PageHeader } from '@/components/dashboard/page-header';
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
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
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
import { create, edit, index, show } from '@/routes/certificates';
import { verify } from '@/routes/verify';
import type { Certificate } from '@/types';

// ── Types ─────────────────────────────────────────────────────────────────────

interface CertificatesIndexProps {
    certificates: Certificate[];
}

// ── Detail row ────────────────────────────────────────────────────────────────

function DetailRow({
    icon: Icon,
    label,
    value,
    mono = false,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    mono?: boolean;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {label}
                </p>
                <p
                    className={`mt-0.5 break-all text-sm font-medium text-foreground ${
                        mono ? 'font-mono text-xs' : ''
                    }`}
                >
                    {value}
                </p>
            </div>
        </div>
    );
}

// ── Certificate View Dialog ───────────────────────────────────────────────────

function CertificateDialog({
    certificate,
    onClose,
}: {
    certificate: Certificate | null;
    onClose: () => void;
}) {
    if (!certificate) {
return null;
}

    return (
        <Dialog open={!!certificate} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center justify-between gap-4 pr-6">
                        <div>
                            <DialogTitle className="flex items-center gap-2">
                                <FileBadge2 className="h-4 w-4 text-primary" />
                                Certificate Details
                            </DialogTitle>
                            <DialogDescription className="mt-0.5">
                                Issued to {certificate.name}
                            </DialogDescription>
                        </div>
                        <StatusBadge status={certificate.status} />
                    </div>
                </DialogHeader>

                <Separator />

                <div className="space-y-4 py-1">
                    <DetailRow
                        icon={User}
                        label="Graduate Name"
                        value={certificate.name}
                    />
                    <DetailRow
                        icon={GraduationCap}
                        label="Course / Programme"
                        value={certificate.course}
                    />
                    <DetailRow
                        icon={CalendarDays}
                        label="Date of Issue"
                        value={new Date(certificate.issued_at).toLocaleDateString(
                            'en-KE',
                            { dateStyle: 'long' },
                        )}
                    />
                    <DetailRow
                        icon={Hash}
                        label="Certificate Hash"
                        value={certificate.hash}
                        mono
                    />
                </div>

                <Separator />

                <div className="flex items-center justify-between gap-2">
                    <a
                        href={verify({hash: certificate.hash}).url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="outline" size="sm" className="gap-2">
                            <ExternalLink className="h-3.5 w-3.5" />
                            Verify Link
                        </Button>
                    </a>

                    <div className="flex items-center gap-2">
                        {/* Edit Status */}
                        <Link href={edit({ certificate: certificate.id }).url}>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Pencil className="h-3.5 w-3.5" />
                                Edit Status
                            </Button>
                        </Link>

                        {/* View full details page */}
                        <Link href={show({ certificate: certificate.id }).url}>
                            <Button size="sm" className="gap-2">
                                View Details
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const breadcrumbs = [
    { title: 'Dashboard',    href: issuer().url  },
    { title: 'Certificates', href: index().url   },
];

export default function CertificatesIndex({ certificates }: CertificatesIndexProps) {
    const [selected, setSelected] = useState<Certificate | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">

                <PageHeader
                    title="Certificates"
                    description="All certificates you have issued."
                    icon={FileBadge2}
                    actions={
                        <Link href={create().url}>
                            <Button size="sm" className="gap-2">
                                <Plus className="h-4 w-4" />
                                Issue Certificate
                            </Button>
                        </Link>
                    }
                />

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">All Certificates</CardTitle>
                        <CardDescription>
                            {certificates.length} certificate
                            {certificates.length !== 1 ? 's' : ''} issued.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Graduate Name</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Issue Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {certificates.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="py-10 text-center text-sm text-muted-foreground"
                                        >
                                            No certificates issued yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    certificates.map((cert) => (
                                        <TableRow key={cert.id}>
                                            <TableCell className="font-medium">
                                                {cert.name}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {cert.course}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {new Date(cert.issued_at).toLocaleDateString(
                                                    'en-KE',
                                                    { dateStyle: 'medium' },
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <StatusBadge status={cert.status} />
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => setSelected(cert)}
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <CertificateDialog
                certificate={selected}
                onClose={() => setSelected(null)}
            />
        </AppLayout>
    );
}