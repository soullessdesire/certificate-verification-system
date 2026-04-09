import { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Users, Plus, Pencil, Trash2, Loader2, UserPlus, UserCog } from 'lucide-react';

import { PageHeader } from '@/components/dashboard/page-header';
import { Badge } from '@/components/ui/badge';
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
import { admin } from '@/routes';
import { users as usersRoute } from '@/routes/admin';
import type { User } from '@/types';

// ── Types ─────────────────────────────────────────────────────────────────────

interface UsersPageProps {
    users: User[];
}

// ── Create Dialog ─────────────────────────────────────────────────────────────

function CreateUserDialog({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name:                  '',
        email:                 '',
        role:                  '',
        password:              '',
        password_confirmation: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/admin/users', {
            onSuccess: () => { reset(); onClose(); },
        });
    }

    function handleClose() { reset(); onClose(); }

    return (
        <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
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

                <form id="create-user-form" onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="cu-name">Full Name</Label>
                        <Input
                            id="cu-name"
                            placeholder="Jane Mwangi"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            autoComplete="off"
                        />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="cu-email">Email Address</Label>
                        <Input
                            id="cu-email"
                            type="email"
                            placeholder="jane@must.ac.ke"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            autoComplete="off"
                        />
                        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="cu-role">Role</Label>
                        <Select
                            value={data.role}
                            onValueChange={(val) => setData('role', val)}
                            disabled={processing}
                        >
                            <SelectTrigger id="cu-role">
                                <SelectValue placeholder="Select a role…" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="issuer">Issuer</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.role && <p className="text-xs text-destructive">{errors.role}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="cu-password">Password</Label>
                        <Input
                            id="cu-password"
                            type="password"
                            placeholder="Min. 8 characters"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            autoComplete="new-password"
                        />
                        {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="cu-password-confirm">Confirm Password</Label>
                        <Input
                            id="cu-password-confirm"
                            type="password"
                            placeholder="Repeat password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            autoComplete="new-password"
                        />
                        {errors.password_confirmation && (
                            <p className="text-xs text-destructive">{errors.password_confirmation}</p>
                        )}
                    </div>
                </form>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={handleClose} disabled={processing}>
                        Cancel
                    </Button>
                    <Button type="submit" form="create-user-form" disabled={processing} className="gap-2">
                        {processing ? (
                            <><Loader2 className="h-4 w-4 animate-spin" />Creating…</>
                        ) : (
                            <><UserPlus className="h-4 w-4" />Create User</>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// ── Edit Dialog ───────────────────────────────────────────────────────────────

function EditUserDialog({
    user,
    onClose,
}: {
    user: User | null;
    onClose: () => void;
}) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        name:                  user?.name  ?? '',
        email:                 user?.email ?? '',
        role:                  user?.roles[0]?.name ?? '',
        password:              '',
        password_confirmation: '',
    });

    // Keep form in sync when the target user changes
    const [syncedId, setSyncedId] = useState<string | null>(null);
    if (user && user.id !== syncedId) {
        setData({
            name:                  user.name,
            email:                 user.email,
            role:                  user.roles[0]?.name ?? '',
            password:              '',
            password_confirmation: '',
        });
        setSyncedId(user.id);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!user) return;
        patch(`/admin/users/${user.id}`, {
            onSuccess: () => { reset(); onClose(); },
        });
    }

    function handleClose() { reset(); setSyncedId(null); onClose(); }

    return (
        <Dialog open={!!user} onOpenChange={(o) => !o && handleClose()}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <UserCog className="h-4 w-4 text-primary" />
                        Edit User
                    </DialogTitle>
                    <DialogDescription>
                        Update the details for <span className="font-medium text-foreground">{user?.name}</span>.
                        Leave the password fields blank to keep the current password.
                    </DialogDescription>
                </DialogHeader>

                <form id="edit-user-form" onSubmit={handleSubmit} className="space-y-4 py-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="eu-name">Full Name</Label>
                        <Input
                            id="eu-name"
                            placeholder="Jane Mwangi"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                        />
                        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="eu-email">Email Address</Label>
                        <Input
                            id="eu-email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                        />
                        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="eu-role">Role</Label>
                        <Select
                            value={data.role}
                            onValueChange={(val) => setData('role', val)}
                            disabled={processing}
                        >
                            <SelectTrigger id="eu-role">
                                <SelectValue placeholder="Select a role…" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="issuer">Issuer</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.role && <p className="text-xs text-destructive">{errors.role}</p>}
                    </div>

                    {/* Optional password change */}
                    <div className="rounded-lg border border-dashed bg-muted/40 px-4 py-3">
                        <p className="mb-3 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                            Change Password — optional
                        </p>

                        <div className="space-y-3">
                            <div className="space-y-1.5">
                                <Label htmlFor="eu-password">New Password</Label>
                                <Input
                                    id="eu-password"
                                    type="password"
                                    placeholder="Leave blank to keep current"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                    autoComplete="new-password"
                                />
                                {errors.password && (
                                    <p className="text-xs text-destructive">{errors.password}</p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="eu-password-confirm">Confirm New Password</Label>
                                <Input
                                    id="eu-password-confirm"
                                    type="password"
                                    placeholder="Repeat new password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                    autoComplete="new-password"
                                />
                                {errors.password_confirmation && (
                                    <p className="text-xs text-destructive">{errors.password_confirmation}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </form>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={handleClose} disabled={processing}>
                        Cancel
                    </Button>
                    <Button type="submit" form="edit-user-form" disabled={processing} className="gap-2">
                        {processing ? (
                            <><Loader2 className="h-4 w-4 animate-spin" />Saving…</>
                        ) : (
                            <><UserCog className="h-4 w-4" />Save Changes</>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// ── Page ──────────────────────────────────────────────────────────────────────

const breadcrumbs = [
    { title: 'Dashboard', href: admin().url      },
    { title: 'Users',     href: usersRoute().url },
];

export default function UsersPage({ users }: UsersPageProps) {
    const [createOpen, setCreateOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<User | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">

                <PageHeader
                    title="Users"
                    description="Manage system users and their roles."
                    icon={Users}
                    actions={
                        <Button
                            size="sm"
                            className="gap-2"
                            onClick={() => setCreateOpen(true)}
                        >
                            <Plus className="h-4 w-4" />
                            Add User
                        </Button>
                    }
                />

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base">All Users</CardTitle>
                        <CardDescription>
                            {users.length} user{users.length !== 1 ? 's' : ''} registered.
                        </CardDescription>
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
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell className="text-muted-foreground">{user.email}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        user.roles[0].name === 'admin'
                                                            ? 'border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300'
                                                            : 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300'
                                                    }
                                                >
                                                    {user.roles[0].name.charAt(0).toUpperCase() +
                                                        user.roles[0].name.slice(1)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {new Date(user.created_at).toLocaleDateString(
                                                    'en-KE',
                                                    { dateStyle: 'medium' },
                                                )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => setEditTarget(user)}
                                                    >
                                                        <Pencil className="h-3.5 w-3.5" />
                                                    </Button>
                                                    <Link
                                                        href={`/admin/users/${user.id}`}
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

            <EditUserDialog
                user={editTarget}
                onClose={() => setEditTarget(null)}
            />
        </AppLayout>
    );
}