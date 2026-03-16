import type { PageProps } from "@inertiajs/core";
import { usePage } from '@inertiajs/react';
import { AdminSidebar } from '@/components/admin-sidebar';
import { IssuerSidebar } from '@/components/issuer-sidebar';

export function AppSidebar(){

    const { auth } = usePage<PageProps>().props;

    return (
        <>
        { auth.is_admin && (<AdminSidebar />)}
        { auth.is_issuer && (<IssuerSidebar />)}
        </>
    )
}