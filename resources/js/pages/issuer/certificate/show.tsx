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
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import type { Certificate } from '@/types';
import { PageHeader } from '@/components/dashboard/page-header';

interface ShowCertificateProps { certificate: Certificate }

export default function ShowCertificate({ certificate }: ShowCertificateProps) {
    const breadcrumbs = [
        { title: 'Dashboard',    href: '/issuer'                       },
        { title: 'Certificates', href: '/issuer/certificates'                    },
        { title: certificate.graduate_name, href: `/issuer/certificates/${certificate.id}` },
    ];

    function handleRevoke() {
        if (confirm('Are you sure you want to revoke this certificate? This action cannot be undone.')) {
            router.patch(`/issuer/certificates/${certificate.id}/revoke`);
        }
    }

    const details = [
        { icon: User,          label: 'Graduate Name', value: certificate.graduate_name },
        { icon: GraduationCap, label: 'Course',        value: certificate.course        },
        { icon: CalendarDays,  label: 'Issue Date',    value: new Date(certificate.issued_at).toLocaleDateString('en-KE', { dateStyle: 'long' }) },
        { icon: Hash,          label: 'Certificate Hash', value: certificate.hash       },
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
                                <Button variant="outline" size="sm" className="gap-2">
                                    <ArrowLeft className="h-4 w-4" />
                                    Back
                                </Button>
                            </Link>
                            <a
                                href={`/verify/${certificate.hash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline" size="sm" className="gap-2">
                                    <ExternalLink className="h-4 w-4" />
                                    Verify Link
                                </Button>
                            </a>
                            {certificate.status !== 'revoked' && (
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="gap-2"
                                    onClick={handleRevoke}
                                >
                                    <ShieldX className="h-4 w-4" />
                                    Revoke
                                </Button>
                            )}
                        </div>
                    }
                />

                <div className="max-w-2xl">
                    <Card>
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-base">{certificate.graduate_name}</CardTitle>
                                <StatusBadge status={certificate.status} />
                            </div>
                            <CardDescription>Certificate ID: {certificate.id}</CardDescription>
                        </CardHeader>

                        <Separator />

                        <CardContent className="pt-5">
                            <dl className="space-y-4">
                                {details.map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="flex items-start gap-3">
                                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <Icon className="h-3.5 w-3.5 text-primary" />
                                        </div>
                                        <div>
                                            <dt className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                                                {label}
                                            </dt>
                                            <dd className={`mt-0.5 text-sm font-medium text-foreground ${label === 'Certificate Hash' ? 'font-mono text-xs break-all' : ''}`}>
                                                {value}
                                            </dd>
                                        </div>
                                    </div>
                                ))}
                            </dl>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}