import type { LucideIcon } from 'lucide-react';
import { Moon, Sun } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface IconAppearanceToggleProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
}

const options: { value: Appearance; icon: LucideIcon; label: string }[] = [
    { value: 'light', icon: Sun, label: 'Light mode' },
    { value: 'dark', icon: Moon, label: 'Dark mode' },
];

export default function ThemeToggle({
    className = '',
    size = 16,
    ...props
}: IconAppearanceToggleProps) {
    const { appearance, updateAppearance } = useAppearance();

    const isDark = appearance === 'dark';
    const next = isDark ? options[0] : options[1];
    const { icon: Icon } = isDark ? options[1] : options[0];

    return (
        <div className={cn('inline-flex', className)} {...props}>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => updateAppearance(next.value)}
                aria-label={`Switch to ${next.label}`}
                title={`Switch to ${next.label}`}
                className={cn(
                    'relative h-8 w-8 rounded-md transition-colors',
                    'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-900',
                    'dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-100',
                )}
            >
                <Icon
                    style={{ width: size, height: size }}
                    className="transition-transform duration-200 ease-in-out"
                    aria-hidden
                />
                <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-primary ring-1 ring-background" />
            </Button>
        </div>
    );
}
