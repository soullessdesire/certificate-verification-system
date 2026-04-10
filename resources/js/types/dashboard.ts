// resources/js/types/dashboard.ts

export type Role = 'admin' | 'issuer';

export interface User {
    id: string;
    name: string;
    email: string;
    role: Role;
    created_at: string;
}

// Certificate stored in the system is either valid or revoked.
// "invalid" is NOT a certificate status — it only appears in verification
// logs when a lookup finds no matching certificate.
export type CertificateStatus = 'valid' | 'revoked';

export interface Certificate {
    id: string;
    hash: string;
    name: string;
    course: string;
    issued_at: string;
    status: CertificateStatus;
}

export interface Graduate {
    id: string;
    name: string;
    email: string;
    course: string;
    graduation_year: number;
    certificate_id?: string;
}

// "invalid" here means no certificate was found — not a certificate status.
export type VerificationStatus = 'valid' | 'invalid';

export interface VerificationLog {
    id: string;
    certificate_id: string | null;
    certificate: Certificate | null;
    certificate_holder: string;
    created_at: string;
    status: VerificationStatus;
    ip_address?: string;
}

export interface AuditLog {
    id: string;
    user?: User;
    action: string;
    description: string;
    created_at: string;
}

// ── Admin dashboard props ─────────────────────────────────────────────────────

export interface AdminStats {
    total_certificates: number;
    total_graduates: number;
    verification_requests_24h: number;
    revoked_certificates: number;
}

export interface AdminDashboardProps {
    stats: AdminStats;
    recent_verifications: VerificationLog[];
    recent_activity: AuditLog[];
}

// ── Issuer dashboard props ────────────────────────────────────────────────────

export interface IssuerStats {
    certificates_issued: number;
    total_graduates: number;
    revoked_certificates: number;
    verification_requests: number;
}

export interface IssuerDashboardProps {
    stats: IssuerStats;
    recent_certificates: Certificate[];
}
