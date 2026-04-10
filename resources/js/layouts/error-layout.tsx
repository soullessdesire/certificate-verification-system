import { Link } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorLayoutProps {
    code: number | string;
    title: string;
    description: string;
    icon: LucideIcon;
    iconClassName?: string;
    actions?: React.ReactNode;
}

export default function ErrorLayout({
    code,
    title,
    description,
    icon: Icon,
    iconClassName,
    actions,
}: ErrorLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
            {/* Error code */}
            <p className="mb-2 text-[80px] leading-none font-bold tracking-tighter text-foreground/10 sm:text-[120px]">
                {code}
            </p>

            {/* Icon */}
            <div
                className={cn(
                    '-mt-6 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border bg-card shadow-sm',
                    iconClassName,
                )}
            >
                <Icon className="h-8 w-8" />
            </div>

            {/* Text */}
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {title}
            </h1>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-muted-foreground">
                {description}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
                {actions ?? (
                    <>
                        <Button
                            variant="outline"
                            onClick={() => window.history.back()}
                            className="gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Go Back
                        </Button>
                        <Link href="/">
                            <Button className="gap-2">
                                <Home className="h-4 w-4" />
                                Home
                            </Button>
                        </Link>
                    </>
                )}
            </div>

            {/* Footer note */}
            <p className="mt-12 text-xs text-muted-foreground">
                Meru University of Science and Technology &mdash; Certificate
                Verification System
            </p>
        </div>
    );
}
