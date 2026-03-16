// resources/js/pages/admin/issuers.tsx

import { Link } from '@inertiajs/react';
import { BadgeCheck, Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { User } from '@/types';
import { PageHeader } from '@/components/dashboard/page-header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface IssuersPageProps { issuers: User[] }

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Issuers',   href: '/admin/issuers'   },
];

export default function IssuersPage({ issuers }: IssuersPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">
                <PageHeader
                    title="Issuers"
                    description="Manage certificate issuers and their permissions."
                    icon={BadgeCheck}
                    actions={
                        <Link href="/admin/issuers/create">
                            <Button size="sm" className="gap-2">
                                <Plus className="h-4 w-4" />
                                Add Issuer
                            </Button>
                        </Link>
                    }
                />
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">All Issuers</CardTitle>
                        <CardDescription>{issuers.length} issuer{issuers.length !== 1 ? 's' : ''} registered.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {issuers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                                            No issuers found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    issuers.map((issuer) => (
                                        <TableRow key={issuer.id}>
                                            <TableCell className="font-medium">{issuer.name}</TableCell>
                                            <TableCell className="text-muted-foreground">{issuer.email}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {new Date(issuer.created_at).toLocaleDateString('en-KE', { dateStyle: 'medium' })}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link href={`/admin/issuers/${issuer.id}/edit`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Pencil className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/admin/issuers/${issuer.id}`} method="delete" as="button">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </Link>
                                                </div>
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