import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Extiende el tipo User de next-auth
   */
  interface User {
    isAdmin?: boolean
  }

  /**
   * Extiende el tipo Session de next-auth
   */
  interface Session {
    user: {
      isAdmin?: boolean
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  /**
   * Extiende el tipo JWT de next-auth
   */
  interface JWT {
    isAdmin?: boolean
  }
}

