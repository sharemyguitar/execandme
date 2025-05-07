// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"

export const authOptions = {
  providers: [
    LinkedInProvider({
      clientId:     process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      // override the issuer so NextAuth will accept LinkedIn's id_token
      issuer:       "https://www.linkedin.com/oauth",

      // only request the OpenID Connect scopes your app has approved
      authorization: {
        params: { scope: "openid profile email" },
      },

      profile(profile) {
        // OIDC fields from LinkedIn
        return {
          id:    profile.sub,
          name:  `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      // upsert your executive in your own DB
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
