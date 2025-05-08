// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth"
import LinkedInProvider from "next-auth/providers/linkedin"

export default NextAuth({
  providers: [
    LinkedInProvider({
      clientId:     process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      // override to match LinkedIn’s OIDC issuer
      issuer:        "https://www.linkedin.com/oauth",
      authorization: { params: { scope: "openid profile email" } },

      profile(profile) {
        return {
          id:    profile.id,
          name:  `${profile.localizedFirstName} ${profile.localizedLastName}`,
          email: profile.emailAddress,
          image: profile
            .profilePicture["displayImage~"]
            .elements[0]
            .identifiers[0]
            .identifier,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
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
  secret: process.env.NEXTAUTH_SECRET,
  debug:  process.env.NODE_ENV === "development",
})
