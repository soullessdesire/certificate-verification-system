import { router } from "@inertiajs/react";
import {
    ShieldCheck,
    ShieldX,
    Search,
    Loader2,
    GraduationCap,
    CalendarDays,
    User,
    Hash,
    ArrowRight,
    Info,
} from "lucide-react";
import { useState, useEffect } from "react";

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
import { Separator } from "@/components/ui/separator";
import MainAppLayout from "@/layouts/main-app-layout";

// ── Types ────────────────────────────────────────────────────────────────────

interface Certificate {
    name: string;
    course: string;
    issued_at: string;
}

interface VerificationResult {
    valid: boolean;
    certificate?: Certificate;
    message?: string;
}

interface VerifyPageProps {
    /** Populated by Laravel when the route is /verify/{hash} */
    result?: VerificationResult;
    /** The hash that was looked up — used to pre-fill the input */
    queried_hash?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("en-KE", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

// ── Result Card ───────────────────────────────────────────────────────────────

function ResultCard({ result }: { result: VerificationResult }) {
    if (!result.valid) {
        return (
            <Card className="border-destructive/40 bg-destructive/5">
                <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                        <ShieldX className="h-8 w-8 text-destructive" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-base font-semibold text-destructive">
                            Verification Failed
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {result.message ??
                                "This certificate could not be verified. It may be invalid, revoked, or not found in our records."}
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const cert = result.certificate!;

    return (
        <Card className="border-green-200 bg-green-50/60 dark:border-green-800 dark:bg-green-950/30">
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                            <ShieldCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <CardTitle className="text-base text-green-800 dark:text-green-200">
                                Certificate Verified
                            </CardTitle>
                            <CardDescription className="text-green-700/70 dark:text-green-400/70">
                                Authenticated against the official registry.
                            </CardDescription>
                        </div>
                    </div>
                    <Badge className="shrink-0 border-green-300 bg-green-100 text-green-800 dark:border-green-700 dark:bg-green-900 dark:text-green-200">
                        ✓ Authentic
                    </Badge>
                </div>
            </CardHeader>

            <Separator className="bg-green-200 dark:bg-green-800" />

            <CardContent className="pt-5">
                <dl className="grid gap-3 sm:grid-cols-3">
                    {[
                        {
                            icon: User,
                            label: "Certificate Holder",
                            value: cert.name,
                        },
                        {
                            icon: GraduationCap,
                            label: "Programme",
                            value: cert.course,
                        },
                        {
                            icon: CalendarDays,
                            label: "Date of Issue",
                            value: formatDate(cert.issued_at),
                        },
                    ].map(({ icon: Icon, label, value }) => (
                        <div
                            key={label}
                            className="flex flex-col gap-1.5 rounded-lg border border-green-200 bg-white/70 p-3 dark:border-green-800 dark:bg-green-950/50"
                        >
                            <div className="flex items-center gap-1.5">
                                <Icon className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                                <dt className="text-[10px] font-semibold uppercase tracking-widest text-green-700/70 dark:text-green-400/70">
                                    {label}
                                </dt>
                            </div>
                            <dd className="text-sm font-medium text-green-900 dark:text-green-100">
                                {value}
                            </dd>
                        </div>
                    ))}
                </dl>
            </CardContent>
        </Card>
    );
}

// ── How it works ──────────────────────────────────────────────────────────────

const steps = [
    {
        step: "01",
        title: "Locate the code",
        description: "Find the unique certificate code or verification URL printed on the certificate.",
    },
    {
        step: "02",
        title: "Enter or visit",
        description: "Type the code below, or simply visit the verification URL from the certificate.",
    },
    {
        step: "03",
        title: "Instant result",
        description: "The system checks the code against our secure registry and returns the result.",
    },
];

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function VerifyPage({ result, queried_hash }: VerifyPageProps) {
    const [hash, setHash] = useState(queried_hash ?? "");
    const [loading, setLoading] = useState(false);

    /**
     * Auto-verify: if the page loaded with a queried_hash (i.e. the user
     * opened a /verify/{hash} URL directly), the backend already ran
     * verification and returned `result` — no JS navigation needed.
     * We just pre-fill the input so the user can see what was checked.
     */
    useEffect(() => {
        if (queried_hash) { 
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHash(queried_hash) 
        }
    }, [queried_hash]);

    function verify(value: string) {
        const trimmed = value.trim();

        if (!trimmed) {
            return
        }
        
        setLoading(true);
        router.get(
            `/verify/${encodeURIComponent(trimmed)}`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setLoading(false),
            }
        );
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        verify(hash);
    }

    return (
        <MainAppLayout>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">

                {/* ── Header ── */}
                <div className="mb-10 text-center">
                    <Badge
                        variant="outline"
                        className="mb-4 gap-1.5 rounded-full border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary"
                    >
                        <ShieldCheck className="h-3 w-3" />
                        Certificate Verification
                    </Badge>

                    <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Verify a Certificate
                    </h1>
                    <p className="mx-auto max-w-md text-base text-muted-foreground">
                        Enter the certificate code or use the verification link provided
                        on the certificate to confirm its authenticity.
                    </p>
                </div>

                {/* ── Manual Input Card ── */}
                <Card className="mb-6">
                    <CardHeader className="pb-4">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Hash className="h-4 w-4 text-primary" />
                            Enter Certificate Code
                        </CardTitle>
                        <CardDescription>
                            The unique code is printed beneath the QR code on the certificate.
                            You can also paste the full verification URL.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="space-y-1.5">
                                <Label htmlFor="hash">Certificate Code or URL</Label>
                                <Input
                                    id="hash"
                                    placeholder="e.g. MUST-2024-CS-00123"
                                    value={hash}
                                    onChange={(e) => setHash(e.target.value)}
                                    disabled={loading}
                                    className="font-mono tracking-wide"
                                    autoComplete="off"
                                    autoFocus={!queried_hash}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full gap-2"
                                disabled={loading || !hash.trim()}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Verifying…
                                    </>
                                ) : (
                                    <>
                                        <Search className="h-4 w-4" />
                                        Verify Certificate
                                        <ArrowRight className="h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* ── URL hint ── */}
                <div className="mb-8 flex items-start gap-2 rounded-lg border border-dashed bg-muted/40 px-4 py-3">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <p className="text-xs leading-relaxed text-muted-foreground">
                        <span className="font-medium text-foreground">Scanning the QR code</span>{" "}
                        on the certificate with your phone camera will open this page
                        automatically with the result pre-loaded — no manual entry needed.
                    </p>
                </div>

                {/* ── Result ── */}
                {result && (
                    <>
                        <Separator className="mb-6" />
                        <ResultCard result={result} />
                    </>
                )}

                {/* ── How it works ── */}
                {!result && (
                    <>
                        <Separator className="my-8" />
                        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                            How verification works
                        </p>
                        <div className="grid gap-6 sm:grid-cols-3">
                            {steps.map(({ step, title, description }) => (
                                <div key={step} className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-[11px] font-bold text-primary">
                                            {step}
                                        </span>
                                        <p className="text-sm font-semibold text-foreground">{title}</p>
                                    </div>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </MainAppLayout>
    );
}