import { useForm } from '@inertiajs/react';
import { FileBadge2, Save, Loader2 } from 'lucide-react';
import type { FormEvent } from 'react';
import { PageHeader } from '@/components/dashboard/page-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { issuer } from '@/routes';
import { create, index } from '@/routes/certificates';
// import type { Graduate } from '@/types';

interface CreateCertificateProps {
    // graduates: Graduate[];
    selected_graduate_id?: string;
}

const breadcrumbs = [
    { title: 'Dashboard',    href: issuer().url          },
    { title: 'Certificates', href: index().url           },
    { title: 'Issue',        href: create().url          },
];

export default function CreateCertificate({ selected_graduate_id }: CreateCertificateProps) {
    const { data, setData, post, processing, errors } = useForm({
        graduate_id: selected_graduate_id ?? '',
        course:      '',
        issued_at:   new Date().toISOString().split('T')[0],
    });

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        post('/issuer/certificates');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">
                <PageHeader
                    title="Issue Certificate"
                    description="Create and sign a new certificate for a graduate."
                    icon={FileBadge2}
                />

                <form onSubmit={handleSubmit} className="max-w-lg">
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-base">Certificate Details</CardTitle>
                            <CardDescription>
                                Fill in the details below. A unique signed hash will be generated automatically.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">

                            <div className="space-y-1.5">
                                <Label htmlFor="graduate_id">Graduate</Label>
                                <Select
                                    value={data.graduate_id}
                                    onValueChange={(val) => setData('graduate_id', val)}
                                    disabled={processing}
                                >
                                    <SelectTrigger id="graduate_id">
                                        <SelectValue placeholder="Select a graduate…" />
                                    </SelectTrigger>
                                    {/* <SelectContent>
                                        {graduates.map((g) => (
                                            <SelectItem key={g.id} value={g.id}>
                                                {g.name} — {g.course} ({g.graduation_year})
                                            </SelectItem>
                                        ))}
                                    </SelectContent> */}
                                </Select>
                                {errors.graduate_id && (
                                    <p className="text-xs text-destructive">{errors.graduate_id}</p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="course">Course / Programme</Label>
                                <Input
                                    id="course"
                                    placeholder="e.g. Bachelor of Computer Science"
                                    value={data.course}
                                    onChange={(e) => setData('course', e.target.value)}
                                    disabled={processing}
                                />
                                {errors.course && (
                                    <p className="text-xs text-destructive">{errors.course}</p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="issued_at">Issue Date</Label>
                                <Input
                                    id="issued_at"
                                    type="date"
                                    value={data.issued_at}
                                    onChange={(e) => setData('issued_at', e.target.value)}
                                    disabled={processing}
                                />
                                {errors.issued_at && (
                                    <p className="text-xs text-destructive">{errors.issued_at}</p>
                                )}
                            </div>

                            <Button type="submit" disabled={processing} className="w-full gap-2">
                                {processing ? (
                                    <><Loader2 className="h-4 w-4 animate-spin" />Issuing…</>
                                ) : (
                                    <><Save className="h-4 w-4" />Issue Certificate</>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}