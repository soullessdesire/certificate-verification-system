import { Link, Form } from '@inertiajs/react';
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
import { issuer } from '@/routes';
import { edit, index, show, update } from '@/routes/certificates';
import type { Certificate, CertificateStatus } from '@/types/dashboard';

// ── Types ─────────────────────────────────────────────────────────────────────

interface EditStatusProps {
    certificate: Certificate;
}

// ── Status options — only valid or revoked ────────────────────────────────────
// "invalid" is NOT a selectable status. It only appears in verification logs
// when a hash lookup finds no matching certificate in the system.

const statusOptions: {
    value: CertificateStatus;
    label: string;
    description: string;
    icon: React.ElementType;
    className: string;
}[] = [
    {
        value: 'valid',
        label: 'Valid',
        description: 'Certificate is valid and will pass verification.',
        icon: ShieldCheck,
        className:
            'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300',
    },
    {
        value: 'revoked',
        label: 'Revoked',
        description: 'Certificate has been revoked and will fail verification.',
        icon: ShieldX,
        className:
            'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300',
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
                <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                    {label}
                </p>
                <p className="mt-0.5 text-sm font-medium text-foreground">
                    {value}
                </p>
            </div>
        </div>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EditCertificateStatus({
    certificate,
}: EditStatusProps) {
    const [status, setStatus] = useState<CertificateStatus>(certificate.status);

    const selectedOption = statusOptions.find((o) => o.value === status);
    const statusChanged = status !== certificate.status;

    const breadcrumbs = [
        { title: 'Dashboard', href: issuer().url },
        { title: 'Certificates', href: index().url },
        {
            title: certificate.name,
            href: show({ certificate: certificate.id }).url,
        },
        {
            title: 'Edit Status',
            href: edit({ certificate: certificate.id }).url,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">
                <PageHeader
                    title="Edit Certificate Status"
                    description="Update the status of this certificate. All other details are read-only."
                    icon={FileBadge2}
                    actions={
                        <Link href={show({ certificate: certificate.id }).url}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Certificate
                            </Button>
                        </Link>
                    }
                />

                <div className="grid max-w-3xl gap-6 lg:grid-cols-[1fr_280px]">
                    {/* ── Status form ── */}
                    <Form
                        method="patch"
                        action={update({ certificate: certificate.id }).url}
                    >
                        {({
                            processing,
                            errors,
                        }: {
                            processing: boolean;
                            errors: Partial<Record<'status', string>>;
                        }) => (
                            <>
                                {/*
                                 * shadcn Select doesn't render a real <select> element,
                                 * so Form can't read its value from the DOM.
                                 * A hidden input stays in sync with local state instead.
                                 */}
                                <input
                                    type="hidden"
                                    name="status"
                                    value={status}
                                />

                                <Card>
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-base">
                                            Certificate Status
                                        </CardTitle>
                                        <CardDescription>
                                            Select the new status. This change
                                            takes effect immediately.
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-5">
                                        {/* Current status */}
                                        <div className="flex items-center justify-between rounded-lg border bg-muted/40 px-4 py-3">
                                            <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                                                Current Status
                                            </span>
                                            <StatusBadge
                                                status={certificate.status}
                                            />
                                        </div>

                                        <Separator />

                                        {/* Status selector */}
                                        <div className="space-y-1.5">
                                            <Label htmlFor="status">
                                                New Status
                                            </Label>
                                            <Select
                                                value={status}
                                                onValueChange={(val) =>
                                                    setStatus(
                                                        val as CertificateStatus,
                                                    )
                                                }
                                                disabled={processing}
                                            >
                                                <SelectTrigger
                                                    id="status"
                                                    className="w-full"
                                                >
                                                    <SelectValue placeholder="Select status…" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {statusOptions.map(
                                                        ({
                                                            value,
                                                            label,
                                                            icon: Icon,
                                                        }) => (
                                                            <SelectItem
                                                                key={value}
                                                                value={value}
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <Icon className="h-3.5 w-3.5" />
                                                                    {label}
                                                                </div>
                                                            </SelectItem>
                                                        ),
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            {errors.status && (
                                                <p className="text-xs text-destructive">
                                                    {errors.status}
                                                </p>
                                            )}
                                        </div>

                                        {/* Selected status description */}
                                        {selectedOption && (
                                            <div
                                                className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-sm ${selectedOption.className}`}
                                            >
                                                <selectedOption.icon className="mt-0.5 h-4 w-4 shrink-0" />
                                                <p>
                                                    {selectedOption.description}
                                                </p>
                                            </div>
                                        )}

                                        {/* Revoke warning */}
                                        {status === 'revoked' &&
                                            certificate.status !==
                                                'revoked' && (
                                                <div className="rounded-lg border border-destructive/40 bg-destructive/5 px-4 py-3">
                                                    <p className="text-xs font-semibold text-destructive">
                                                        Warning — this action
                                                        affects verification
                                                    </p>
                                                    <p className="mt-1 text-xs text-destructive/80">
                                                        Revoking this
                                                        certificate will cause
                                                        all future verification
                                                        attempts to fail. Anyone
                                                        scanning the QR code
                                                        will see a failed
                                                        result.
                                                    </p>
                                                </div>
                                            )}

                                        <Separator />

                                        <div className="flex items-center gap-3">
                                            <Button
                                                type="submit"
                                                disabled={
                                                    processing || !statusChanged
                                                }
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

                                            <Link
                                                href={
                                                    show({
                                                        certificate:
                                                            certificate.id,
                                                    }).url
                                                }
                                            >
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
                            </>
                        )}
                    </Form>

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
                                value={certificate.name}
                            />
                            <DetailRow
                                icon={GraduationCap}
                                label="Course"
                                value={certificate.course}
                            />
                            <DetailRow
                                icon={CalendarDays}
                                label="Issued"
                                value={new Date(
                                    certificate.issued_at,
                                ).toLocaleDateString('en-KE', {
                                    dateStyle: 'long',
                                })}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
