import { useForm } from '@inertiajs/react';
import { Settings, Save, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { PageHeader } from '@/components/dashboard/page-header';

interface SystemSettings {
    institution_name: string;
    institution_email: string;
    verification_url_base: string;
    certificates_per_page: number;
}

interface SettingsPageProps { settings: SystemSettings }

const breadcrumbs = [
    { title: 'Dashboard', href: '/admin/dashboard' },
    { title: 'Settings',  href: '/admin/settings'  },
];

export default function SettingsPage({ settings }: SettingsPageProps) {
    const { data, setData, patch, processing, errors } = useForm<SystemSettings>(settings);

    function handleSubmit(e : unknown) {
        e.preventDefault();
        patch('/admin/settings');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex flex-col gap-6 p-6">
                <PageHeader
                    title="Settings"
                    description="Manage system-wide configuration."
                    icon={Settings}
                />

                <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

                    {/* Institution */}
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-base">Institution Details</CardTitle>
                            <CardDescription>
                                Basic information about the issuing institution.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="institution_name">Institution Name</Label>
                                <Input
                                    id="institution_name"
                                    value={data.institution_name}
                                    onChange={(e) => setData('institution_name', e.target.value)}
                                    disabled={processing}
                                />
                                {errors.institution_name && (
                                    <p className="text-xs text-destructive">{errors.institution_name}</p>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="institution_email">Official Email</Label>
                                <Input
                                    id="institution_email"
                                    type="email"
                                    value={data.institution_email}
                                    onChange={(e) => setData('institution_email', e.target.value)}
                                    disabled={processing}
                                />
                                {errors.institution_email && (
                                    <p className="text-xs text-destructive">{errors.institution_email}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Verification */}
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-base">Verification Settings</CardTitle>
                            <CardDescription>
                                Configure how certificate verification URLs are generated.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="verification_url_base">Verification Base URL</Label>
                                <Input
                                    id="verification_url_base"
                                    value={data.verification_url_base}
                                    onChange={(e) => setData('verification_url_base', e.target.value)}
                                    disabled={processing}
                                    placeholder="https://certverify.must.ac.ke/verify"
                                />
                                {errors.verification_url_base && (
                                    <p className="text-xs text-destructive">{errors.verification_url_base}</p>
                                )}
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="certificates_per_page">Certificates per Page</Label>
                                <Input
                                    id="certificates_per_page"
                                    type="number"
                                    min={5}
                                    max={200}
                                    value={data.certificates_per_page}
                                    onChange={(e) => setData('certificates_per_page', Number(e.target.value))}
                                    disabled={processing}
                                />
                                {errors.certificates_per_page && (
                                    <p className="text-xs text-destructive">{errors.certificates_per_page}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Separator />

                    <Button type="submit" disabled={processing} className="gap-2">
                        {processing ? (
                            <><Loader2 className="h-4 w-4 animate-spin" />Saving…</>
                        ) : (
                            <><Save className="h-4 w-4" />Save Settings</>
                        )}
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}