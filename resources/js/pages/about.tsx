import { Link } from "@inertiajs/react";
import {
    ShieldCheck,
    QrCode,
    Lock,
    Clock,
    Globe,
    BookOpen,
    ArrowRight,
    Building2,
    GraduationCap,
    BadgeCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MainAppLayout from "@/layouts/main-app-layout";

// ── Data ─────────────────────────────────────────────────────────────────────

const features = [
    {
        icon: QrCode,
        title: "QR Code Authentication",
        description:
            "Every issued certificate carries a unique QR code that links directly to a tamper-evident record in our secure registry.",
    },
    {
        icon: Lock,
        title: "End-to-End Encrypted",
        description:
            "All verification requests are transmitted over TLS and validated against cryptographically signed records.",
    },
    {
        icon: Clock,
        title: "Real-Time Results",
        description:
            "Validation queries return in under 3 seconds — no waiting, no manual cross-checking.",
    },
    {
        icon: Globe,
        title: "Globally Accessible",
        description:
            "The portal is available 24/7 to employers, academic institutions, and government bodies worldwide.",
    },
    {
        icon: BadgeCheck,
        title: "Tamper-Evident Records",
        description:
            "Certificate data is stored with integrity checks. Any alteration to a physical or digital certificate is immediately detected.",
    },
    {
        icon: BookOpen,
        title: "Full Academic Scope",
        description:
            "Supports verification of all certificates issued by MUST — undergraduate, postgraduate, and professional programmes.",
    },
];

const stats = [
    { value: "12,000+", label: "Certificates issued" },
    { value: "99.9%",   label: "System uptime" },
    { value: "< 3 s",   label: "Avg. response time" },
    { value: "2018",    label: "System established" },
];

const audiences = [
    {
        icon: GraduationCap,
        title: "Students & Alumni",
        description:
            "Share a verifiable link or QR code with employers instead of physical certificates. Your credentials are always accessible.",
    },
    {
        icon: Building2,
        title: "Employers & Recruiters",
        description:
            "Instantly confirm the authenticity of any certificate presented during the hiring process — no calls to the university required.",
    },
    {
        icon: Globe,
        title: "Academic Institutions",
        description:
            "Verify transfer credentials and prior qualifications of applicants in seconds during the admissions process.",
    },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
    return (
        <MainAppLayout>

            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">

                {/* Hero */}
                <div className="mb-14 text-center">
                    <Badge
                        variant="outline"
                        className="mb-4 gap-1.5 rounded-full border-primary/30 bg-primary/5 px-3 py-1 text-xs text-primary"
                    >
                        <ShieldCheck className="h-3 w-3" />
                        About the System
                    </Badge>

                    <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Built for Trust. Designed for Speed.
                    </h1>
                    <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
                        The CertVerify portal is the official certificate authentication system
                        of <span className="font-medium text-foreground">Meru University of Science and Technology</span>.
                        It gives students, alumni, employers, and institutions a single, authoritative
                        source of truth for academic credentials.
                    </p>
                </div>

                {/* Stats strip */}
                <div className="mb-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {stats.map(({ value, label }) => (
                        <div
                            key={label}
                            className="flex flex-col items-center gap-1 rounded-xl border bg-card p-5 text-center"
                        >
                            <span className="text-2xl font-bold text-primary">{value}</span>
                            <span className="text-xs text-muted-foreground">{label}</span>
                        </div>
                    ))}
                </div>

                <Separator className="mb-14" />

                {/* Features grid */}
                <section className="mb-14">
                    <h2 className="mb-2 text-xl font-semibold text-foreground">
                        System Capabilities
                    </h2>
                    <p className="mb-8 text-sm text-muted-foreground">
                        Designed around the needs of a modern academic institution.
                    </p>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map(({ icon: Icon, title, description }) => (
                            <div
                                key={title}
                                className="flex flex-col gap-3 rounded-xl border bg-card p-5 transition hover:border-primary/40"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                                    <Icon className="h-4 w-4 text-primary" />
                                </div>
                                <p className="text-sm font-semibold text-foreground">{title}</p>
                                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <Separator className="mb-14" />

                {/* Who is it for */}
                <section className="mb-14">
                    <h2 className="mb-2 text-xl font-semibold text-foreground">Who Uses CertVerify?</h2>
                    <p className="mb-8 text-sm text-muted-foreground">
                        The portal serves a broad audience — from fresh graduates to multinational employers.
                    </p>

                    <div className="grid gap-6 sm:grid-cols-3">
                        {audiences.map(({ icon: Icon, title, description }) => (
                            <div key={title} className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border bg-background">
                                        <Icon className="h-4 w-4 text-primary" />
                                    </div>
                                    <p className="text-sm font-semibold text-foreground">{title}</p>
                                </div>
                                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <Separator className="mb-14" />

                {/* CTA */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <h2 className="text-xl font-semibold text-foreground">Ready to verify a certificate?</h2>
                    <p className="text-sm text-muted-foreground">
                        It takes under 10 seconds. No account required.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <Link href="/verify">
                            <Button className="gap-2">
                                <QrCode className="h-4 w-4" />
                                Verify Certificate
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" className="gap-2">
                                Contact Registry
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </MainAppLayout>
    );
}