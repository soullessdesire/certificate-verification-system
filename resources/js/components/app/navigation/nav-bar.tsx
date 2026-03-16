import type { PageProps } from "@inertiajs/core";
import { usePage, Link } from "@inertiajs/react";
import { Menu, X, ShieldCheck, LayoutDashboard, LogOut, User } from "lucide-react";
import { useState } from "react";

import ThemeToggle from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import { useInitials } from "@/hooks/use-initials";
import { useIsMobile } from "@/hooks/use-mobile";

import { about, contact,home, issuer, logout, verify } from "@/routes";
import { register } from "@/routes";
import { admin } from "@/routes";
import login from "@/routes/login";
import { edit } from "@/routes/profile";


const INSTITUTION = "Meru University of Science and Technology";

export default function NavBar() {
    const { auth } = usePage<PageProps>().props;
    const url =  auth.is_admin ? admin().url : issuer().url

    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);
    const getInitials = useInitials();

    const navItems = [
        { href: home().url,    label: "Home"    },
        { href: verify().url,  label: "Verify"  },
        { href: about().url,   label: "About"   },
        { href: contact().url, label: "Contact" },
    ];

    const path =
        typeof window !== "undefined" ? window.location.pathname : "";

    const navLink = (href: string, label: string) => (
        <Link
            key={href}
            href={href}
            className={`text-sm transition ${
                path === href
                    ? "font-semibold text-primary"
                    : "text-muted-foreground hover:text-foreground"
            }`}
        >
            {label}
        </Link>
    );

    const UserMenu = () =>
        auth?.user ? (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full p-0 focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                                {getInitials(auth.user.name)}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col gap-0.5">
                        <span className="text-sm font-medium leading-none">
                            {auth.user.name}
                        </span>
                        <span className="text-xs font-normal text-muted-foreground">
                            {auth.user.email}
                        </span>
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuLabel className="text-[10px] font-normal uppercase tracking-widest text-muted-foreground">
                        {INSTITUTION}
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    { (auth.is_admin || auth.is_issuer) && (
                        <DropdownMenuItem asChild>
                            <Link href={url} className="flex cursor-pointer items-center gap-2">
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>
                        </DropdownMenuItem>
                    ) }

                    <DropdownMenuItem asChild>
                        <Link href={edit()} className="flex cursor-pointer items-center gap-2">
                            <User className="h-4 w-4" />
                            Profile
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild className="text-destructive focus:text-destructive">
                        <Link
                            href={logout()}
                            method="post"
                            as="button"
                            className="flex w-full cursor-pointer items-center gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            Log out
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ) : null;

    return (
        <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
            <div className="flex items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <ShieldCheck size={20} className="text-primary" />
                    CertVerify
                </Link>

                {/* Desktop Navigation */}
                {!isMobile && (
                    <>
                        <div className="flex items-center gap-6">
                            {navItems.map((item) => navLink(item.href, item.label))}
                        </div>

                        <div className="flex items-center gap-3">
                            <ThemeToggle />

                            {auth?.user ? (
                                <UserMenu />
                            ) : (
                                <>
                                    <Link href={login.store.definition.url}>
                                        <Button variant="ghost">Login</Button>
                                    </Link>
                                    <Link href={register()}>
                                        <Button>Sign Up</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </>
                )}

                {/* Mobile Menu Button */}
                {isMobile && (
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        {auth?.user && (<UserMenu />)}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <X /> : <Menu />}
                        </Button>
                    </div>
                )}
            </div>

            {/* Mobile Menu */}
            {isMobile && open && (
                <div className="flex flex-col gap-4 px-6 pb-6">
                    {navItems.map((item) => navLink(item.href, item.label))}

                    {auth?.user ? (
                        navLink(url, "Dashboard")
                    ) : (
                        <>
                            <Link href={register()}>
                                <Button variant="outline" className="w-full">
                                    Login
                                </Button>
                            </Link>
                            <Link href={register()}>
                                <Button className="w-full">Sign Up</Button>
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}