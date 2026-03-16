import { Form } from "@inertiajs/react";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    Loader2,
    ShieldCheck,
    MessageSquare,
    CheckCircle2,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import MainAppLayout from "@/layouts/main-app-layout";

// ── Data ─────────────────────────────────────────────────────────────────────

const contactInfo = [
    {
        icon: MapPin,
        label: "Address",
        value: "P.O. Box 972-60200, Meru, Kenya",
        sub: "Main Campus, Meru Town",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+254 (0) 64 30 301",
        sub: "Mon – Fri, 8 am – 5 pm EAT",
    },
    {
        icon: Mail,
        label: "Email",
        value: "registrar@must.ac.ke",
        sub: "For verification enquiries",
    },
    {
        icon: Clock,
        label: "Office Hours",
        value: "Monday – Friday",
        sub: "8:00 am – 5:00 pm (EAT)",
    },
];

const enquiryTypes = [
    "Certificate verification issue",
    "QR code not scanning",
    "Lost or damaged certificate",
    "Employer verification request",
    "Transcript request",
    "General enquiry",
    "Other",
];

// ── Page ─────────────────────────────────────────────────────────────────────

interface ContactPageProps {
    submitted?: boolean;
    errors?: Partial<Record<"name" | "email" | "enquiry_type" | "message", string>>;
}

export default function ContactPage({ submitted, errors = {} }: ContactPageProps) {
    return (
        <MainAppLayout>
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">

                {/* Header */}
                <div className="mb-12 text-center">
                    <Badge
                        variant="outline"
                        className="mb-4 gap-1.5 rounded-full border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary"
                    >
                        <MessageSquare className="h-3 w-3" />
                        Contact the Registry
                    </Badge>

                    <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Get in Touch
                    </h1>
                    <p className="mx-auto max-w-xl text-base text-muted-foreground">
                        Have questions about a certificate or need help with the verification
                        portal? The Academic Registry at Meru University is here to assist.
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

                    {/* Contact form card */}
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="flex items-center gap-2 text-base">
                                <ShieldCheck className="h-4 w-4 text-primary" />
                                Send an Enquiry
                            </CardTitle>
                            <CardDescription>
                                We aim to respond within 1–2 working days.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            {submitted && (
                                <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <AlertTitle className="text-green-800 dark:text-green-200">
                                        Message received
                                    </AlertTitle>
                                    <AlertDescription className="text-green-700 dark:text-green-300">
                                        Thank you for reaching out. A member of the registry team
                                        will respond to your email within 1–2 working days.
                                    </AlertDescription>
                                </Alert>
                            )}

                            <Form
                                method="post"
                                action="/contact"
                                className="space-y-5"
                            >
                                {({ processing }: { processing: boolean }) => (
                                    <>
                                        <div className="grid gap-4 sm:grid-cols-2">

                                            {/* Name */}
                                            <div className="space-y-1.5">
                                                <Label htmlFor="name">Full Name</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    placeholder="Jane Mwangi"
                                                    disabled={processing}
                                                />
                                                {errors.name && (
                                                    <p className="text-xs text-destructive">{errors.name}</p>
                                                )}
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-1.5">
                                                <Label htmlFor="email">Email Address</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="jane@example.com"
                                                    disabled={processing}
                                                />
                                                {errors.email && (
                                                    <p className="text-xs text-destructive">{errors.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Enquiry type — hidden input synced to Select */}
                                        <div className="space-y-1.5">
                                            <Label htmlFor="enquiry_type">Enquiry Type</Label>
                                            <Select name="enquiry_type" disabled={processing}>
                                                <SelectTrigger id="enquiry_type">
                                                    <SelectValue placeholder="Select a topic…" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {enquiryTypes.map((type) => (
                                                        <SelectItem key={type} value={type}>
                                                            {type}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.enquiry_type && (
                                                <p className="text-xs text-destructive">{errors.enquiry_type}</p>
                                            )}
                                        </div>

                                        {/* Message */}
                                        <div className="space-y-1.5">
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                placeholder="Please describe your issue or question in detail…"
                                                rows={5}
                                                disabled={processing}
                                                className="resize-none"
                                            />
                                            {errors.message && (
                                                <p className="text-xs text-destructive">{errors.message}</p>
                                            )}
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full gap-2"
                                            disabled={processing}
                                        >
                                            {processing ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    Sending…
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="h-4 w-4" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </>
                                )}
                            </Form>
                        </CardContent>
                    </Card>

                    {/* Contact info sidebar */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <h2 className="mb-1 text-sm font-semibold text-foreground">
                                Academic Registry
                            </h2>
                            <p className="text-sm text-muted-foreground">
                                Meru University of Science and Technology
                            </p>
                        </div>

                        <Separator />

                        <div className="flex flex-col gap-5">
                            {contactInfo.map(({ icon: Icon, label, value, sub }) => (
                                <div key={label} className="flex gap-3">
                                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                        <Icon className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                                            {label}
                                        </p>
                                        <p className="text-sm font-medium text-foreground">{value}</p>
                                        <p className="text-xs text-muted-foreground">{sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Separator />

                        <div className="rounded-xl border bg-card p-4">
                            <p className="mb-1 text-sm font-semibold text-foreground">
                                Need a quick answer?
                            </p>
                            <p className="mb-3 text-xs leading-relaxed text-muted-foreground">
                                Most certificate queries can be resolved instantly using the
                                verification portal — no email required.
                            </p>
                            <a href="/verify">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full gap-2 text-xs"
                                >
                                    Go to Verify
                                    <ShieldCheck className="h-3.5 w-3.5" />
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </MainAppLayout>
    );
}