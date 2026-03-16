import { Link } from '@inertiajs/react';
import { FileBadge2, Plus, Eye } from 'lucide-react';
import { PageHeader } from '@/components/dashboard/page-header';
import { StatusBadge } from '@/components/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { create } from '@/routes/certificates';
import type { Certificate } from '@/types';

interface CertificatesIndexProps { certificates: Certificate[] }

const breadcrumbs = [
    { title: 'Dashboard',    href: '/issuer'    },
    { title: 'Certificates', href: '/issuer/certificates' },
];

export default function CertificatesIndex({ certificates }: CertificatesIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">
                <PageHeader
                    title="Certificates"
                    description="All certificates you have issued."
                    icon={FileBadge2}
                    actions={
                        <Link href={create()}>
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
                        <CardDescription>{certificates.length} certificate{certificates.length !== 1 ? 's' : ''} issued.</CardDescription>
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
                                        <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                                            No certificates issued yet.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    certificates.map((cert) => (
                                        <TableRow key={cert.id}>
                                            <TableCell className="font-medium">{cert.graduate_name}</TableCell>
                                            <TableCell className="text-muted-foreground">{cert.course}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {new Date(cert.issued_at).toLocaleDateString('en-KE', { dateStyle: 'medium' })}
                                            </TableCell>
                                            <TableCell><StatusBadge status={cert.status} /></TableCell>
                                            <TableCell className="text-right">
                                                <Link href={`/issuer/certificates/${cert.id}`}>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Eye className="h-3.5 w-3.5" />
                                                    </Button>
                                                </Link>
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