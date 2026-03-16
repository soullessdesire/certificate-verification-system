export type Role = 'admin' | 'issuer';

export interface Certificate {
    id: string;
    hash: string;
    graduate_name: string;
    course: string;
    issued_at: string;
    status: 'active' | 'revoked' | 'pending';
}
 
export interface AdminStats {
    total_certificates: number;
    verification_requests_24h: number;
    revoked_certificates: number;
}
export interface IssuerStats {
    certificates_issued: number;
    pending_certificates: number;
    verification_requests: number;
}
export interface Graduate {
    id: string;
    name: string;
    email: string;
    course: string;
    graduation_year: number;
    certificate_id?: string;
}
 
export interface VerificationLog {
    id: string;
    certificate_id: string;
    certificate_holder: string;
    verified_at: string;
    status: 'valid' | 'invalid';
    ip_address?: string;
}
 
export interface AuditLog {
    id: string;
    user_name: string;
    action: string;
    description: string;
    created_at: string;
}