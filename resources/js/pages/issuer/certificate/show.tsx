import { Link, router } from '@inertiajs/react';
import {
    FileBadge2,
    User,
    GraduationCap,
    CalendarDays,
    Hash,
    ShieldX,
    ExternalLink,
    ArrowLeft,
} from 'lucide-react';
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
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import type { Certificate } from '@/types';

interface ShowCertificateProps {
    certificate: Certificate;
    qrSvg: string;
    verificationUrl: string;
}

export default function ShowCertificate({
    certificate,
    qrSvg,
    verificationUrl,
}: ShowCertificateProps) {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/issuer' },
        { title: 'Certificates', href: '/issuer/certificates' },
        {
            title: certificate.name,
            href: `/issuer/certificates/${certificate.id}`,
        },
    ];

    const details = [
        {
            icon: User,
            label: 'Graduate Name',
            value: certificate.name,
        },
        { icon: GraduationCap, label: 'Course', value: certificate.course },
        {
            icon: CalendarDays,
            label: 'Issue Date',
            value: new Date(certificate.issued_at).toLocaleDateString('en-KE', {
                dateStyle: 'long',
            }),
        },
        { icon: Hash, label: 'Certificate Hash', value: certificate.hash },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">
                <PageHeader
                    title="Certificate Details"
                    description="View and manage this certificate."
                    icon={FileBadge2}
                    actions={
                        <div className="flex items-center gap-2">
                            <Link href="/issuer/certificates">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back
                                </Button>
                            </Link>

                            <a
                                href={verificationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                    Verify Link
                                </Button>
                            </a>
                        </div>
                    }
                />

                <div className="max-w-2xl">
                    <Card>
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base">
                                    {certificate.name}
                                </CardTitle>
                                <StatusBadge status={certificate.status} />
                            </div>
                            <CardDescription>
                                Certificate ID: {certificate.id}
                            </CardDescription>
                        </CardHeader>

                        <Separator />

                        <CardContent className="space-y-6 pt-5">
                            {/* Certificate Details */}
                            <dl className="space-y-4">
                                {details.map(({ icon: Icon, label, value }) => (
                                    <div
                                        key={label}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <Icon className="h-3.5 w-3.5 text-primary" />
                                        </div>
                                        <div>
                                            <dt className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                                                {label}
                                            </dt>
                                            <dd
                                                className={`mt-0.5 text-sm font-medium text-foreground ${
                                                    label === 'Certificate Hash'
                                                        ? 'font-mono text-xs break-all'
                                                        : ''
                                                }`}
                                            >
                                                {value}
                                            </dd>
                                        </div>
                                    </div>
                                ))}
                            </dl>

                            <Separator />

                            {/* QR Code Section */}
                            {certificate.status !== 'revoked' && (
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <p className="text-xs tracking-widest text-muted-foreground uppercase">
                                        Scan to Verify
                                    </p>

                                    <div
                                        className="rounded-xl border bg-white p-3 shadow-sm"
                                        dangerouslySetInnerHTML={{
                                            __html: qrSvg,
                                        }}
                                    />

                                    <a
                                        href={verificationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-center text-xs break-all text-primary hover:underline"
                                    >
                                        {verificationUrl}
                                    </a>

                                    {/* Download QR */}
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                            const blob = new Blob([qrSvg], {
                                                type: 'image/svg+xml',
                                            });
                                            const url =
                                                URL.createObjectURL(blob);
                                            const a =
                                                document.createElement('a');
                                            a.href = url;
                                            a.download = 'certificate-qr.svg';
                                            a.click();
                                        }}
                                    >
                                        Download QR
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
