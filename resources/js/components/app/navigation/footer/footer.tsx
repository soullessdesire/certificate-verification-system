import { Link } from "@inertiajs/react";
import { ShieldCheck, MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const YEAR = new Date().getFullYear();

const footerLinks = {
    System: [
        { label: "Verify Certificate", href: "/verify" },
        { label: "About the System",   href: "/about" },
        { label: "Contact Us",         href: "/contact" },
    ],
    Institution: [
        { label: "Meru University", href: "https://www.must.ac.ke", external: true },
        { label: "Academic Registry", href: "https://www.must.ac.ke/registry", external: true },
        { label: "Student Portal",   href: "https://portal.must.ac.ke", external: true },
    ],
    Legal: [
        { label: "Privacy Policy",    href: "/privacy" },
        { label: "Terms of Use",      href: "/terms" },
        { label: "Data Protection",   href: "/data-protection" },
    ],
};

const contactDetails = [
    { icon: MapPin, text: "P.O. Box 972-60200, Meru, Kenya" },
    { icon: Phone,  text: "+254 (0) 64 30 301" },
    { icon: Mail,   text: "registrar@must.ac.ke" },
];

export default function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">

                {/* Top grid */}
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">

                    {/* Brand column */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            CertVerify
                        </Link>

                        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                            The official certificate verification portal of Meru University
                            of Science and Technology. Authenticate academic credentials
                            instantly and securely.
                        </p>

                        <div className="mt-2 flex flex-col gap-2">
                            {contactDetails.map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-start gap-2 text-xs text-muted-foreground">
                                    <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group}>
                            <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                                {group}
                            </p>
                            <ul className="space-y-2.5">
                                {links.map(({ label, href, external }) => (
                                    <li key={label}>
                                        {external ? (
                                            <a
                                                href={href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
                                            >
                                                {label}
                                                <ExternalLink className="h-3 w-3 opacity-50" />
                                            </a>
                                        ) : (
                                            <Link
                                                href={href}
                                                className="text-sm text-muted-foreground transition hover:text-foreground"
                                            >
                                                {label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Separator className="my-8" />

                {/* Bottom bar */}
                <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
                    <p className="text-xs text-muted-foreground">
                        © {YEAR} Meru University of Science and Technology. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Certificate Verification System &middot; Powered by the Academic Registry
                    </p>
                </div>
            </div>
        </footer>
    );
}