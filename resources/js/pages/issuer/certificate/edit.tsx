import { useForm, Link } from '@inertiajs/react';
import {
    FileBadge2,
    ArrowLeft,
    Save,
    Loader2,
    User,
    GraduationCap,
    CalendarDays,
    ShieldCheck,
    ShieldX,
    Clock,
} from 'lucide-react';
import type { FormEvent } from 'react';

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
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import type { Certificate } from '@/types';

// ── Types ────────────────────────────────────────────────────────────────────

type CertificateStatus = 'active' | 'revoked' | 'pending';

interface EditStatusProps {
    certificate: Certificate;
}

// ── Status option config ──────────────────────────────────────────────────────

const statusOptions: {
    value: CertificateStatus;
    label: string;
    description: string;
    icon: React.ElementType;
    className: string;
}[] = [
    {
        value: 'active',
        label: 'Active',
        description: 'Certificate is valid and can be verified.',
        icon: ShieldCheck,
        className: 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300',
    },
    {
        value: 'pending',
        label: 'Pending',
        description: 'Certificate has been created but is not yet active.',
        icon: Clock,
        className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300',
    },
    {
        value: 'revoked',
        label: 'Revoked',
        description: 'Certificate has been revoked and will fail verification.',
        icon: ShieldX,
        className: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300',
    },
];

// ── Read-only detail row ──────────────────────────────────────────────────────

function DetailRow({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {label}
                </p>
                <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
            </div>
        </div>
    );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function EditCertificateStatus({ certificate }: EditStatusProps) {
    const breadcrumbs = [
        { title: 'Dashboard',    href: '/issuer/dashboard'                              },
        { title: 'Certificates', href: '/issuer/certificates'                           },
        { title: certificate.graduate_name, href: `/issuer/certificates/${certificate.id}` },
        { title: 'Edit Status',  href: `/issuer/certificates/${certificate.id}/edit-status` },
    ];

    const { data, setData, patch, processing, errors} = useForm({
        status: certificate.status as CertificateStatus,
    });

    const selectedOption = statusOptions.find((o) => o.value === data.status);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        patch(`/issuer/certificates/${certificate.id}/status`);
    }

    const statusChanged = data.status !== certificate.status;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">

                <PageHeader
                    title="Edit Certificate Status"
                    description="Update the status of this certificate. All other details are read-only."
                    icon={FileBadge2}
                    actions={
                        <Link href={`/issuer/certificates/${certificate.id}`}>
                            <Button variant="outline" size="sm" className="gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Certificate
                            </Button>
                        </Link>
                    }
                />

                <div className="grid max-w-3xl gap-6 lg:grid-cols-[1fr_280px]">

                    {/* ── Status form ── */}
                    <form onSubmit={handleSubmit}>
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base">Certificate Status</CardTitle>
                                <CardDescription>
                                    Select the new status for this certificate. This change
                                    takes effect immediately.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-5">

                                {/* Current status */}
                                <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
                                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                        Current Status
                                    </span>
                                    <StatusBadge status={certificate.status} />
                                </div>

                                <Separator />

                                {/* Status selector */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="status">New Status</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(val) =>
                                            setData('status', val as CertificateStatus)
                                        }
                                        disabled={processing}
                                    >
                                        <SelectTrigger id="status" className="w-full">
                                            <SelectValue placeholder="Select status…" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statusOptions.map(({ value, label, icon: Icon }) => (
                                                <SelectItem key={value} value={value}>
                                                    <div className="flex items-center gap-2">
                                                        <Icon className="h-3.5 w-3.5" />
                                                        {label}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.status && (
                                        <p className="text-xs text-destructive">{errors.status}</p>
                                    )}
                                </div>

                                {/* Selected status description */}
                                {selectedOption && (
                                    <div
                                        className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${selectedOption.className}`}
                                    >
                                        <selectedOption.icon className="mt-0.5 h-4 w-4 shrink-0" />
                                        <p>{selectedOption.description}</p>
                                    </div>
                                )}

                                {/* Revoke warning */}
                                {data.status === 'revoked' && certificate.status !== 'revoked' && (
                                    <div className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3">
                                        <p className="text-xs font-semibold text-destructive">
                                            Warning — this action affects verification
                                        </p>
                                        <p className="mt-1 text-xs text-destructive/80">
                                            Revoking this certificate will cause all future
                                            verification attempts to fail. Anyone scanning the
                                            QR code will see an invalid result.
                                        </p>
                                    </div>
                                )}

                                <Separator />

                                <div className="flex items-center gap-3">
                                    <Button
                                        type="submit"
                                        disabled={processing || !statusChanged}
                                        className="gap-2"
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                Saving…
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4" />
                                                Save Status
                                            </>
                                        )}
                                    </Button>

                                    <Link href={`/issuer/certificates/${certificate.id}`}>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            disabled={processing}
                                        >
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </form>

                    {/* ── Read-only certificate info ── */}
                    <Card className="h-fit">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm text-muted-foreground">
                                Certificate Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <DetailRow
                                icon={User}
                                label="Graduate"
                                value={certificate.graduate_name}
                            />
                            <DetailRow
                                icon={GraduationCap}
                                label="Course"
                                value={certificate.course}
                            />
                            <DetailRow
                                icon={CalendarDays}
                                label="Issued"
                                value={new Date(certificate.issued_at).toLocaleDateString(
                                    'en-KE',
                                    { dateStyle: 'long' },
                                )}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}