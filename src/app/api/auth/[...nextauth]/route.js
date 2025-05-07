// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import { OAuthProvider } from "next-auth/providers/oauth"

export const authOptions = {
  // enable verbose trace logs
  debug: true,

  providers: [
    OAuthProvider({
      id: "linkedin",
      name: "LinkedIn",
      type: "oauth",
      version: "2.0",

      // only the OIDC scopes your app has approved
      scope: "openid profile email",
      params: { grant_type: "authorization_code" },

      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
        params: { response_type: "code" },
      },
      token: "https://www.linkedin.com/oauth/v2/accessToken",
      userinfo: "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))",

      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      async profile(profile, tokens) {
        // fetch the email address separately
        const emailRes = await fetch(
          "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
          { headers: { Authorization: `Bearer ${tokens.access_token}` } }
        )
        const emailJson = await emailRes.json()

        return {
          id: profile.id,
          name: `${profile.localizedFirstName} ${profile.localizedLastName}`,
          email: emailJson.elements?.[0]["handle~"]?.emailAddress || null,
          image:
            profile.profilePicture["displayImage~"].elements[0]
              .identifiers[0].identifier,
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      // upsert into your own DB
      await fetch(`${process.env.NEXTAUTH_URL}/api/executives/upsert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          linkedInId: user.id,
          name: user.name,
          photoUrl: user.image,
        }),
      })
      return true
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
