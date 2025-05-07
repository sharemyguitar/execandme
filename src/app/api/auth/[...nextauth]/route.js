// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"

export const authOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      // 🔒 ask for only the OpenID Connect scopes your app is approved for
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },

      // Map the OIDC profile into our user object
      profile(profile) {
        return {
          id: profile.sub ?? profile.id,
          name: `${profile.name?.given_name ?? profile.localizedFirstName} ${profile.name?.family_name ?? profile.localizedLastName}`,
          email: profile.email ?? profile.emailAddress,
          image: profile.picture ?? (
            profile.profilePicture?.["displayImage~"]?.elements?.[0]?.identifiers?.[0]?.identifier
          ),
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      // Upsert your exec in your own DB
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
