import type { LucideIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface PageHeaderProps {
    title: string;
    description?: string;
    icon?: LucideIcon;
    actions?: React.ReactNode;
}

export function PageHeader({ title, description, icon: Icon, actions }: PageHeaderProps) {
    return (
        <>
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    {Icon && (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-xl font-bold tracking-tight text-foreground">
                            {title}
                        </h1>
                        {description && (
                            <p className="text-sm text-muted-foreground">{description}</p>
                        )}
                    </div>
                </div>
                {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
            </div>
            <Separator className="my-5" />
        </>
    );
}