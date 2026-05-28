export interface TokenInfo {
    token: string;
}

export interface JwtPayload {
    sub: string;
    email: string;
    accountType: string;
    exp: number;
    token: string;
}