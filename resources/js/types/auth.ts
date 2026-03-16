export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    roles: Role[];
    [key: string]: unknown;
};

export type Role = {
    id: number,
    name: string,
    guard_name: 'web',
    created_at: string,
    updated_at: string,
}

export type Auth = {
    user: User;
    is_admin : boolean;
    is_issuer: boolean;
}; 

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
