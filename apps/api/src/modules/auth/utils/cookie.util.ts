import { Response } from "express";

export const setAuthCookies = (
    res: Response,
    accessToken: string,
    refreshToken: string
) => {
    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 3600 * 1000, // 1 hour
    });

    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 3600 * 1000, // 7 days
    });
};

export const clearAuthCookies = (res: Response) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
};
