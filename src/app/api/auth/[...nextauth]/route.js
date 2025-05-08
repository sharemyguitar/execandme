// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"

export const authOptions = {
  debug: true, // verbose logs during troubleshooting

  providers: [
    LinkedInProvider({
      clientId:     process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      // 1) Accept the OIDC issuer LinkedIn actually uses
      issuer:       "https://www.linkedin.com/oauth",

      // 2) Only request the three OIDC scopes your app is approved for
      authorization: {
        params: { scope: "openid profile email" },
      },

      // 3) Map the OIDC ID token claims into NextAuth’s User object
      profile(profile) {
        return {
          id:    profile.sub,      // OIDC “subject” claim
          name:  profile.name,     // OIDC “name” claim
          email: profile.email,    // OIDC “email” claim
          image: profile.picture,  // OIDC “picture” claim
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      // Upsert your executive record in your own DB
      await fetch(`${process.env.NEXTAUTH_URL}/api/executives/upsert`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          linkedInId: user.id,
          name:       user.name,
          photoUrl:   user.image,
        }),
      })
      return true
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
