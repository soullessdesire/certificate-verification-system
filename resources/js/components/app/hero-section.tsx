import { Link } from '@inertiajs/react';
import {
    ArrowRight,
    CheckCircle2,
    Clock,
    Lock,
    QrCode,
    ScanLine,
    ShieldCheck,
    Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { index as verify } from '@/routes/verify';

// ---------------------------------------------------------------------------
// Animated QR-code security badge (pure SVG — no external deps)
// ---------------------------------------------------------------------------
function QrSecurityBadge() {
    return (
        <div className="relative flex flex-col items-center gap-3">
            {/* Outer glow ring */}
            <div className="relative flex items-center justify-center">
                {/* Pulse rings */}
                <span className="absolute inline-flex h-44 w-44 animate-ping rounded-full bg-primary/10 duration-[2000ms]" />
                <span className="absolute inline-flex h-36 w-36 animate-ping rounded-full bg-primary/10 duration-[3000ms]" />

                {/* Badge card */}
                <div className="relative z-10 flex h-44 w-44 flex-col items-center justify-center rounded-2xl border border-border bg-card shadow-sm">

                    {/* Verified seal top */}
                    <div className="absolute -top-4 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary shadow">
                        <CheckCircle2 className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
                    </div>

                    {/* Decorative corner marks (QR finder patterns) */}
                    <CornerMark className="absolute left-3 top-6" />
                    <CornerMark className="absolute right-3 top-6 scale-x-[-1]" />
                    <CornerMark className="absolute bottom-6 left-3 scale-y-[-1]" />

                    {/* Center QR icon */}
                    <QrCode className="h-14 w-14 text-foreground/80" strokeWidth={1.2} />

                    {/* Animated scan line */}
                    <div
                        className="pointer-events-none absolute left-4 right-4 h-px bg-primary/70"
                        style={{
                            animation: 'scanLine 2.4s ease-in-out infinite',
                        }}
                    />

                    {/* Bottom label */}
                    <div className="absolute bottom-2 flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5">
                        <ScanLine className="h-3 w-3 text-primary" />
                        <span className="text-[10px] font-medium tracking-widest text-primary">
                            SCAN TO VERIFY
                        </span>
                    </div>
                </div>
            </div>

            {/* Keyframes injected once */}
            <style>{`
                @keyframes scanLine {
                    0%   { top: 28px; opacity: 0; }
                    10%  { opacity: 1; }
                    90%  { opacity: 1; }
                    100% { top: calc(100% - 28px); opacity: 0; }
                }
            `}</style>
        </div>
    );
}

// Tiny QR finder-pattern corner SVG
function CornerMark({ className }: { className?: string }) {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className={className}
        >
            <rect
                x="1"
                y="1"
                width="16"
                height="16"
                rx="3"
                stroke="currentColor"
                strokeWidth="2"
                className="text-foreground/30"
            />
            <rect
                x="4"
                y="4"
                width="10"
                height="10"
                rx="1.5"
                className="fill-foreground/20"
            />
        </svg>
    );
}

// ---------------------------------------------------------------------------
// Stat item
// ---------------------------------------------------------------------------
interface StatProps {
    value: string;
    label: string;
}
function Stat({ value, label }: StatProps) {
    return (
        <div className="flex flex-col items-center gap-0.5 sm:items-start">
            <span className="text-lg font-semibold text-foreground">{value}</span>
            <span className="text-xs text-muted-foreground">{label}</span>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Trust pill
// ---------------------------------------------------------------------------
function TrustPill({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
    return (
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
            <span>{label}</span>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Main Hero component
// ---------------------------------------------------------------------------
export default function HeroSection() {
    return (
        <section className="relative w-full overflow-hidden bg-background">
            {/* Subtle grid background */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[size:32px_32px] opacity-[0.035] dark:opacity-[0.06]"
                style={{
                    backgroundImage:
                        'linear-gradient(to right,hsl(var(--foreground)) 1px,transparent 1px),linear-gradient(to bottom,hsl(var(--foreground)) 1px,transparent 1px)',
                }}
            />

            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

            <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
                <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between">

                    {/* ── Left / text column ─────────────────────────────── */}
                    <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">

                        {/* Status badge */}
                        <Badge
                            variant="outline"
                            className="mb-6 gap-1.5 rounded-full border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
                        >
                            <Sparkles className="h-3 w-3" />
                            Official Certificate Verification Portal
                        </Badge>

                        {/* Headline */}
                        <h1 className="mb-5 max-w-lg text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.1]">
                            Verify Certificates{' '}
                            <span className="text-primary">Instantly</span>{' '}
                            with QR Code
                        </h1>

                        {/* Sub-headline */}
                        <p className="mb-8 max-w-md text-base leading-relaxed text-muted-foreground">
                            Authenticate academic credentials and official documents in seconds.
                            Simply scan the QR code on any certificate — our secure system
                            returns a tamper-evident result in real time.
                        </p>

                        {/* CTA buttons */}
                        <div className="mb-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                            <Link 
                                href={verify()}>
                                <Button size="lg" className="gap-2 px-6 font-medium shadow-sm">
                                    <QrCode className="h-4 w-4" />
                                    Verify Certificate
                                </Button>
                            </Link>
                            <Button
                                variant="outline"
                                size="lg"
                                className="gap-2 px-6 font-medium"
                            >
                                Learn How It Works
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Trust signals */}
                        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 lg:justify-start">
                            <TrustPill icon={ShieldCheck} label="Tamper-evident records" />
                            <TrustPill icon={Lock} label="End-to-end encrypted" />
                            <TrustPill icon={Clock} label="Available 24/7" />
                        </div>
                    </div>

                    {/* ── Right / visual column ──────────────────────────── */}
                    <div className="flex flex-shrink-0 flex-col items-center gap-6 lg:w-[340px]">

                        {/* QR badge */}
                        <QrSecurityBadge />

                        {/* How-it-works mini-steps */}
                        <div className="w-full rounded-xl border border-border bg-card p-4 shadow-sm">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                                How it works
                            </p>
                            <ol className="space-y-3">
                                {[
                                    { step: '01', text: 'Scan the QR code on the certificate' },
                                    { step: '02', text: 'System validates the unique certificate ID' },
                                    { step: '03', text: 'Receive instant verification result' },
                                ].map(({ step, text }) => (
                                    <li key={step} className="flex items-start gap-3">
                                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-primary/10 text-[11px] font-bold text-primary">
                                            {step}
                                        </span>
                                        <span className="text-sm leading-snug text-muted-foreground">
                                            {text}
                                        </span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>

                {/* ── Stats row ──────────────────────────────────────────── */}
                <Separator className="mt-16 mb-8" />
                <div className="flex flex-wrap items-center justify-center gap-8 sm:justify-between">
                    <Stat value="12,000+" label="Certificates verified" />
                    <Stat value="99.9%" label="System uptime" />
                    <Stat value="< 3s" label="Average response time" />
                    <Stat value="ISO 27001" label="Security certified" />
                </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </section>
    );
}