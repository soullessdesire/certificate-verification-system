// resources/js/components/dashboard/status-badge.tsx

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Status = 'active' | 'revoked' | 'pending' | 'valid' | 'invalid';

const statusConfig: Record<Status, { label: string; className: string }> = {
    active: {
        label: 'Active',
        className: 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300',
    },
    revoked: {
        label: 'Revoked',
        className: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300',
    },
    pending: {
        label: 'Pending',
        className: 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300',
    },
    valid: {
        label: 'Valid',
        className: 'border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300',
    },
    invalid: {
        label: 'Invalid',
        className: 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300',
    },
};

interface StatusBadgeProps {
    status: Status;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const config = statusConfig[status];
    
    return (
        <Badge
            variant="outline"
            className={cn('text-[11px] font-medium', config.className, className)}
        >
            {config.label}
        </Badge>
    );
}