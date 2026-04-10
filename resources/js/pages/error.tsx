/**
 * resources/js/pages/error.tsx
 *
 * Inertia error page handler.
 *
 * Register in your app.tsx / app entry:
 *
 *   import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
 *   createInertiaApp({
 *     resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, ...),
 *     ...
 *   });
 *
 * Then in HandleInertiaRequests middleware, or via a dedicated ExceptionHandler,
 * render this component for HTTP errors:
 *
 *   // app/Exceptions/Handler.php
 *   public function register(): void
 *   {
 *       $this->renderable(function (NotFoundHttpException $e, Request $request) {
 *           if ($request->inertia()) {
 *               return Inertia::render('error', ['status' => 404]);
 *           }
 *       });
 *   }
 */

import {
    FileSearch,
    Lock,
    ShieldOff,
    TimerReset,
    FileWarning,
    Gauge,
    ServerCrash,
    Construction,
    AlertTriangle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import ErrorLayout from '@/layouts/error-layout';

interface ErrorPageProps {
    status: number;
}

interface ErrorConfig {
    title: string;
    description: string;
    icon: LucideIcon;
    iconClassName: string;
}

const errorMap: Record<number, ErrorConfig> = {
    400: {
        title: 'Bad Request',
        description:
            'The server could not understand your request. Please check the URL or form data and try again.',
        icon: AlertTriangle,
        iconClassName:
            'border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400',
    },
    401: {
        title: 'Authentication Required',
        description:
            'You must be signed in to access this page. Please log in with your credentials to continue.',
        icon: Lock,
        iconClassName:
            'border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400',
    },
    403: {
        title: 'Access Denied',
        description:
            "You don't have permission to view this page. If you believe this is a mistake, please contact the system administrator.",
        icon: ShieldOff,
        iconClassName:
            'border-orange-200 bg-orange-50 text-orange-600 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-400',
    },
    404: {
        title: 'Page Not Found',
        description:
            "The page you're looking for doesn't exist or may have been moved. If you followed a certificate verification link, the code may be incorrect.",
        icon: FileSearch,
        iconClassName:
            'border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400',
    },
    419: {
        title: 'Session Expired',
        description:
            'Your session has expired due to inactivity or a security token mismatch. Please refresh the page and try again.',
        icon: TimerReset,
        iconClassName:
            'border-yellow-200 bg-yellow-50 text-yellow-600 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-400',
    },
    422: {
        title: 'Invalid Request',
        description:
            'The data you submitted could not be processed. Please check your input and try again.',
        icon: FileWarning,
        iconClassName:
            'border-amber-200 bg-amber-50 text-amber-600 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-400',
    },
    429: {
        title: 'Too Many Requests',
        description:
            "You've made too many requests in a short period. Please wait a moment before trying again.",
        icon: Gauge,
        iconClassName:
            'border-purple-200 bg-purple-50 text-purple-600 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-400',
    },
    500: {
        title: 'Internal Server Error',
        description:
            'Something went wrong on our end. Our team has been notified and is working to resolve the issue.',
        icon: ServerCrash,
        iconClassName:
            'border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400',
    },
    503: {
        title: 'Down for Maintenance',
        description:
            "The Certificate Verification System is temporarily unavailable while we perform scheduled maintenance. We'll be back shortly.",
        icon: Construction,
        iconClassName:
            'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400',
    },
};

const fallback: ErrorConfig = {
    title: 'Unexpected Error',
    description:
        'An unexpected error occurred. Please try again or contact support if the problem persists.',
    icon: AlertTriangle,
    iconClassName:
        'border-red-200 bg-red-50 text-red-600 dark:border-red-800 dark:bg-red-950 dark:text-red-400',
};

export default function ErrorPage({ status }: ErrorPageProps) {
    const config = errorMap[status] ?? fallback;

    return (
        <ErrorLayout
            code={status}
            title={config.title}
            description={config.description}
            icon={config.icon}
            iconClassName={config.iconClassName}
        />
    );
}
