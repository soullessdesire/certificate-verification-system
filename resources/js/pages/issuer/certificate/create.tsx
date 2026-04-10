import { Form } from '@inertiajs/react';
import { FileBadge2, Save, Loader2 } from 'lucide-react';

import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { issuer } from '@/routes';
import { create, index, store } from '@/routes/certificates';

// ── Constants ─────────────────────────────────────────────────────────────────

/** Earliest valid issue date — adjust to match the institution's founding year */
const MIN_ISSUED_AT = '2000-01-01';

/** Latest valid issue date — today, recalculated on each render */
const today = () => new Date().toISOString().split('T')[0];

// ── Breadcrumbs ───────────────────────────────────────────────────────────────

const breadcrumbs = [
    { title: 'Dashboard', href: issuer().url },
    { title: 'Certificates', href: index().url },
    { title: 'Issue', href: create().url },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CreateCertificate() {
    const todayValue = today();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">
                <PageHeader
                    title="Issue Certificate"
                    description="Create and sign a new certificate for a graduate."
                    icon={FileBadge2}
                />

                <Form method="post" action={store().url} className="max-w-lg">
                    {({
                        processing,
                        errors,
                    }: {
                        processing: boolean;
                        errors: Partial<
                            Record<
                                | 'first_name'
                                | 'last_name'
                                | 'course'
                                | 'issued_at',
                                string
                            >
                        >;
                    }) => (
                        <Card>
                            <CardHeader className="pb-4">
                                <CardTitle className="text-base">
                                    Certificate Details
                                </CardTitle>
                                <CardDescription>
                                    Fill in the details below. A unique signed
                                    hash will be generated automatically.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Name row */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="first_name">
                                            First Name
                                        </Label>
                                        <Input
                                            id="first_name"
                                            name="first_name"
                                            placeholder="Jane"
                                            disabled={processing}
                                            autoComplete="off"
                                            className={
                                                errors.first_name
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                        />
                                        {errors.first_name && (
                                            <p className="text-xs text-destructive">
                                                {errors.first_name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="last_name">
                                            Last Name
                                        </Label>
                                        <Input
                                            id="last_name"
                                            name="last_name"
                                            placeholder="Mwangi"
                                            disabled={processing}
                                            autoComplete="off"
                                            className={
                                                errors.last_name
                                                    ? 'border-destructive'
                                                    : ''
                                            }
                                        />
                                        {errors.last_name && (
                                            <p className="text-xs text-destructive">
                                                {errors.last_name}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Course */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="course">
                                        Course / Programme
                                    </Label>
                                    <Input
                                        id="course"
                                        name="course"
                                        placeholder="e.g. Bachelor of Computer Science"
                                        disabled={processing}
                                        className={
                                            errors.course
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    />
                                    {errors.course && (
                                        <p className="text-xs text-destructive">
                                            {errors.course}
                                        </p>
                                    )}
                                </div>

                                {/* Issue date */}
                                <div className="space-y-1.5">
                                    <Label htmlFor="issued_at">
                                        Issue Date
                                    </Label>
                                    <Input
                                        id="issued_at"
                                        name="issued_at"
                                        type="date"
                                        defaultValue={todayValue}
                                        min={MIN_ISSUED_AT}
                                        max={todayValue}
                                        disabled={processing}
                                        className={
                                            errors.issued_at
                                                ? 'border-destructive'
                                                : ''
                                        }
                                    />
                                    {errors.issued_at ? (
                                        <p className="text-xs text-destructive">
                                            {errors.issued_at}
                                        </p>
                                    ) : (
                                        <p className="text-xs text-muted-foreground">
                                            Must be between{' '}
                                            {new Date(
                                                MIN_ISSUED_AT,
                                            ).toLocaleDateString('en-KE', {
                                                dateStyle: 'medium',
                                            })}{' '}
                                            and today.
                                        </p>
                                    )}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full gap-2"
                                >
                                    {processing ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Issuing…
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4" />
                                            Issue Certificate
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
