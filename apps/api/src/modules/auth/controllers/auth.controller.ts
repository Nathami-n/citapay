import {
    Controller,
    Post,
    UseGuards,
    Req,
    Res,
    Get,
    Body,
    UnauthorizedException,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import type { Request, Response } from "express";
import { AppConfigService } from "@app/common";
import { AuthService } from "@api/modules/auth/services";
import { LocalAuthGuard, JwtAuthGuard, GoogleAuthGuard } from "@api/modules/auth/guards";
import { setAuthCookies, clearAuthCookies } from "@api/modules/auth/utils";
import { EmailSignupDto, EmailLoginDto } from "@api/modules/auth/dto";

@ApiTags("Auth")
@Controller({ path: "auth", version: "1" })
export class AuthController {
    constructor(
        private authService: AuthService,
        private config: AppConfigService
    ) { }

    @Post("signup")
    @ApiOperation({ summary: "Register a new user" })
    @ApiResponse({ status: 201, description: "User successfully registered" })
    async signup(@Body() dto: EmailSignupDto) {
        return this.authService.signup(dto);
    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    @ApiOperation({ summary: "Login with email and password" })
    @ApiBody({ type: EmailLoginDto })
    @ApiResponse({ status: 200, description: "Successfully logged in" })
    async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const deviceInfo = {
            ip: req.ip,
            userAgent: req.headers["user-agent"],
        };
        const { accessToken, refreshToken } = await this.authService.login(
            req.user,
            deviceInfo
        );
        setAuthCookies(res, accessToken, refreshToken);
        return { message: "Logged in successfully" };
    }

    @Get("refresh")
    @ApiOperation({ summary: "Refresh access token" })
    @ApiResponse({ status: 200, description: "Tokens refreshed" })
    async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const oldRefreshToken = req.cookies?.refresh_token;
        if (!oldRefreshToken) {
            throw new UnauthorizedException("No refresh token provided");
        }

        const deviceInfo = {
            ip: req.ip,
            userAgent: req.headers["user-agent"],
        };

        const { accessToken, refreshToken } = await this.authService.refresh(
            oldRefreshToken,
            deviceInfo
        );
        setAuthCookies(res, accessToken, refreshToken);
        return { message: "Tokens refreshed" };
    }

    @Post("logout")
    @ApiOperation({ summary: "Logout user and invalidate session" })
    @ApiResponse({ status: 200, description: "Logged out successfully" })
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const refreshToken = req.cookies?.refresh_token;
        if (refreshToken) {
            await this.authService.logout(refreshToken);
        }
        clearAuthCookies(res);
        return { message: "Logged out successfully" };
    }

    @UseGuards(GoogleAuthGuard)
    @Get("google")
    @ApiOperation({ summary: "Initialize Google OAuth login" })
    async googleAuth(@Req() req: Request) { }

    @UseGuards(GoogleAuthGuard)
    @Get("google/callback")
    @ApiOperation({ summary: "Google OAuth callback" })
    async googleAuthRedirect(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ) {
        const deviceInfo = {
            ip: req.ip,
            userAgent: req.headers["user-agent"],
        };
        const { accessToken, refreshToken } = await this.authService.login(
            req.user,
            deviceInfo
        );
        setAuthCookies(res, accessToken, refreshToken);

        // Redirect to frontend
        res.redirect(`${this.config.frontendUrl}/auth/success`);
    }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    @ApiOperation({ summary: "Get currently logged in user info" })
    @ApiResponse({ status: 200, description: "Returns current user" })
    async getMe(@Req() req: Request) {
        return req.user;
    }
}
