// export { auth as middleware } from "@/auth"

import NextAuth from "next-auth";

import authConfig from "@/auth.config";

import {
   DEFAULT_LOGIN_REDIRECT,
   apiAuthPrefix,
   authRoutes,
   publicRoutes
} from "@/routes"

const {auth} = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);
    
    //allow every api route
    if (isApiAuthRoute) {
        return 
    }
    
    //check the auth routes
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return 
    }

    // check if user is not loggedin and not in public redirect "/auth/login"
    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl));
    }
    
    return 
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}