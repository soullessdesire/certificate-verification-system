import { Form, Link, usePage } from '@inertiajs/react';
import { Users, Plus, Loader2, Trash2, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';

import { toast } from 'sonner';
import UserController, {
    destroy,
} from '@/actions/App/Http/Controllers/UserController';
import { PageHeader } from '@/components/dashboard/page-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { User } from '@/types';

// ── Create Dialog ─────────────────────────────────────────────────────────────

function CreateUserDialog({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash?.type === 'success') {
            toast.success(flash.message);
            onClose();
        }
    }, [flash]);

    return (
        <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4 text-primary" />
                        Add New User
                    </DialogTitle>
                    <DialogDescription>
                        Create a new user account and assign them a role.
                    </DialogDescription>
                </DialogHeader>

                <Form
                    {...UserController.store.form.post()}
                    className="space-y-4 py-2"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="space-y-1.5">
                                <Label>Full Name</Label>
                                <Input name="name" disabled={processing} />
                                {errors.name && (
                                    <p className="text-xs text-destructive">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <Label>Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    disabled={processing}
                                />
                                {errors.email && (
                                    <p className="text-xs text-destructive">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <Label>Role</Label>
                                <Select name="role" disabled={processing}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>
                                        <SelectItem value="issuer">
                                            Issuer
                                        </SelectItem>
                                        <SelectItem value="employer">
                                            Employer
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.role && (
                                    <p className="text-xs text-destructive">
                                        {errors.role}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <Label>Password</Label>
                                <Input
                                    name="password"
                                    type="password"
                                    disabled={processing}
                                />
                                {errors.password && (
                                    <p className="text-xs text-destructive">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <Label>Confirm Password</Label>
                                <Input
                                    name="password_confirmation"
                                    type="password"
                                    disabled={processing}
                                />
                            </div>

                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    disabled={processing}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        <>
                                            <UserPlus className="h-4 w-4" />
                                            Create User
                                        </>
                                    )}
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default function UsersPage({ users }: { users: User[] }) {
    const [createOpen, setCreateOpen] = useState(false);

    return (
        <AppLayout>
            <div className="space-y-6 p-6">
                <PageHeader
                    title="Users"
                    icon={Users}
                    actions={
                        <Button onClick={() => setCreateOpen(true)}>
                            <Plus /> Add User
                        </Button>
                    }
                />

                <Card>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead />
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {users.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="py-10 text-center text-sm text-muted-foreground"
                                        >
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">
                                                {user.name}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {user.email}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        user.roles[0].name ===
                                                        'admin'
                                                            ? 'border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300'
                                                            : 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300'
                                                    }
                                                >
                                                    {user.roles[0].name
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        user.roles[0].name.slice(
                                                            1,
                                                        )}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {new Date(
                                                    user.created_at,
                                                ).toLocaleDateString('en-KE', {
                                                    dateStyle: 'medium',
                                                })}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link
                                                        href={destroy({
                                                            user: user.id,
                                                        })}
                                                        method="delete"
                                                        as="button"
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-destructive hover:text-destructive"
                                                        >
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

            <CreateUserDialog
                open={createOpen}
                onClose={() => setCreateOpen(false)}
            />
        </AppLayout>
    );
}
