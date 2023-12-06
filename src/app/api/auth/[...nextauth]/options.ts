import { type DefaultSession, type NextAuthOptions } from "next-auth";

import DiscordProvider from "next-auth/providers/discord";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import RedditProvider from "next-auth/providers/reddit";
import TwitterProvider from "next-auth/providers/twitter";
import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: DefaultSession["user"] & {
            id: string;
            // ...other properties
            // role: UserRole;
        };
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}

export const options: NextAuthOptions = {
    callbacks: {
        signIn: async ({ user: { email }, account }) => {
            if (email) {
                const foundUser = await db.user.findUnique({
                    where: { email },
                });
                if (foundUser) {
                    if (account?.provider) {
                        let linkedAccount = await db.account.findFirst({
                            where: {
                                userId: foundUser.id,
                                provider: account.provider,
                            },
                        });
                        if (!linkedAccount) {
                            linkedAccount = await db.account.create({
                                data: {
                                    userId: foundUser.id,
                                    type: account.type,
                                    provider: account.provider,
                                    providerAccountId:
                                        account.providerAccountId,
                                },
                            });
                        }
                        return true;
                    }
                }
            }
            return true;
        },
        session: ({ session, user }) => ({
            ...session,
            user: {
                ...session.user,
                id: user.id,
            },
        }),
    },
    adapter: PrismaAdapter(db),
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                },
            },
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
        }),
        RedditProvider({
            clientId: process.env.REDDIT_CLIENT_ID as string,
            clientSecret: process.env.REDDIT_CLIENT_SECRET as string,
            authorization: {
                params: {
                    duration: "permanent",
                },
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        TwitterProvider({
            clientId: process.env.TWITTER_CLIENT_ID as string,
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
            version: "2.0",
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    // debug: process.env.NODE_ENV === "development",
    pages: {
        signIn: "/",
    },
};
