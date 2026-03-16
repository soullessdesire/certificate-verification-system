import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: number | string;
    icon: LucideIcon;
    description?: string;
    trend?: { value: number; label: string };
    iconClassName?: string;
}

export function StatCard({
    title,
    value,
    icon: Icon,
    description,
    trend,
    iconClassName,
}: StatCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground truncate">
                            {title}
                        </p>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                            {typeof value === 'number' ? value.toLocaleString() : value}
                        </p>
                        {description && (
                            <p className="mt-1 text-xs text-muted-foreground">{description}</p>
                        )}
                        {trend && (
                            <p
                                className={cn(
                                    'mt-1 text-xs font-medium',
                                    trend.value >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500',
                                )}
                            >
                                {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}% {trend.label}
                            </p>
                        )}
                    </div>
                    <div
                        className={cn(
                            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10',
                            iconClassName,
                        )}
                    >
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}