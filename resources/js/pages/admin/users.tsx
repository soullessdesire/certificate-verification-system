// resources/js/pages/admin/users.tsx

import { Link } from '@inertiajs/react';
import { Users, Plus, Pencil, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { admin } from '@/routes';
import { users } from '@/routes/admin';
import type { User } from '@/types';
import { PageHeader } from '@/components/dashboard/page-header';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

interface UsersPageProps {
    users: User[];
}

const breadcrumbs = [
    { title: 'Dashboard', href: admin().url },
    { title: 'Users',     href: users().url },
];

export default function UsersPage({ users }: UsersPageProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">

                <PageHeader
                    title="Users"
                    description="Manage system users and their roles."
                    icon={Users}
                    actions={
                        <Link href="/admin/users/create">
                            <Button size="sm" className="gap-2">
                                <Plus className="h-4 w-4" />
                                Add User
                            </Button>
                        </Link>
                    }
                />

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">All Users</CardTitle>
                        <CardDescription>{users.length} user{users.length !== 1 ? 's' : ''} registered.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        user.role === 'admin'
                                                            ? 'border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300'
                                                            : 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300'
                                                    }
                                                >
                                                    {user.roles[0].name.charAt(0).toUpperCase() + user.roles[0].name.slice(1)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {new Date(user.created_at).toLocaleDateString('en-KE', { dateStyle: 'medium' })}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link href={`/admin/users/${user.id}/edit`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Pencil className="h-3.5 w-3.5" />
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        href={`/admin/users/${user.id}`}
                                                        method="delete"
                                                        as="button"
                                                    >
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