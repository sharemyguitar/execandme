// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"

export const authOptions = {
  providers: [
    LinkedInProvider({
      // ⚙️ your credentials
      clientId:     process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      // 🚩 override the expected issuer so NextAuth’s JWT validator
      //     accepts LinkedIn’s id_token
      issuer: "https://www.linkedin.com/oauth",

      // 🔒 only ask for the OIDC scopes you were approved for
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },

      // map LinkedIn’s response to our “user” object
      profile(profile) {
        return {
          id:    profile.id,
          name:  `${profile.localizedFirstName} ${profile.localizedLastName}`,
          email: profile.emailAddress,
          image: profile.profilePicture["displayImage~"]
                    .elements[0]
                    .identifiers[0]
                    .identifier,
        }
      },
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      // upsert into your own DB
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
