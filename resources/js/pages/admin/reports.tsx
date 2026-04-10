import { BarChart3, Download } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';

interface ReportSummary {
    total_certificates: number;
    total_verifications: number;
    total_revocations: number;
    total_graduates: number;
    period_label: string;
}

interface ReportsPageProps { summary: ReportSummary }

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Reports',   href: '/admin/reports'   },
];

export default function ReportsPage({ summary }: ReportsPageProps) {
    const metrics = [
        { label: 'Certificates Issued',      value: summary.total_certificates  },
        { label: 'Verification Requests',    value: summary.total_verifications },
        { label: 'Certificates Revoked',     value: summary.total_revocations   },
        { label: 'Registered Graduates',     value: summary.total_graduates     },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">
                <PageHeader
                    title="Reports"
                    description="Summary reports for the certificate verification system."
                    icon={BarChart3}
                    actions={
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Export CSV
                        </Button>
                    }
                />

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Period:</span>
                    <span className="font-medium text-foreground">{summary.period_label}</span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {metrics.map(({ label, value }) => (
                        <Card key={label}>
                            <CardContent className="p-6">
                                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                    {label}
                                </p>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                                    {value?.toLocaleString()}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Separator />

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Generate Custom Report</CardTitle>
                        <CardDescription>
                            Select a date range and export a detailed report in CSV or PDF format.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-3">
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Certificates Report
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Verification Report
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Download className="h-4 w-4" />
                            Audit Report
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}