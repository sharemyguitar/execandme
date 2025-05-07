// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import OAuthProvider from "next-auth/providers/oauth"

export const authOptions = {
  debug: true,       // ← turn on verbose debug logs
  providers: [
    OAuthProvider({
      id: "linkedin",
      name: "LinkedIn",
      type: "oauth",
      version: "2.0",
      scope: "r_liteprofile r_emailaddress",
      params: { grant_type: "authorization_code" },
      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
        params: { response_type: "code" },
      },
      token: "https://www.linkedin.com/oauth/v2/accessToken",
      userinfo:
        "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))",
      async profile(profile, tokens) {
        // pull email out of its own endpoint
        const res = await fetch(
          "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
          { headers: { Authorization: `Bearer ${tokens.access_token}` } }
        )
        const json = await res.json()
        return {
          id: profile.id,
          name: `${profile.localizedFirstName} ${profile.localizedLastName}`,
          email: json.elements?.[0]["handle~"]?.emailAddress,
          image:
            profile.profilePicture["displayImage~"].elements[0].identifiers[0]
              .identifier,
        }
      },
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
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
