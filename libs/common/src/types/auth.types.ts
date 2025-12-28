import { UserRole } from "@prisma/client";

export interface AuthUserPayload {
    userId: string;
    email: string;
    role: UserRole;
    sessionId: string;
}

export interface SessionPayload {
    refreshToken: string;
    userId: string;
    ipAddress?: string;
    userAgent?: string;
    expiresAt: Date;
}
