import { Response } from "express";
import { COOKIE_NAMES } from "@app/common";

export const setAuthCookies = (
    res: Response,
    accessToken: string,
    refreshToken: string
) => {
    res.cookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600 * 1000, // 1 hour
    });

    res.cookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 3600 * 1000, // 7 days
    });
};

export const clearAuthCookies = (res: Response) => {
    res.clearCookie(COOKIE_NAMES.ACCESS_TOKEN);
    res.clearCookie(COOKIE_NAMES.REFRESH_TOKEN);
};
