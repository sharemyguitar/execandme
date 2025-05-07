// src/app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";

export const authOptions = {
  // Tell NextAuth which providers to use
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      // 🔒 Only request the OpenID Connect scopes your app is approved for
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },

      // Map LinkedIn’s returned profile into NextAuth’s User object
      profile(profile) {
        return {
          id: profile.id,
          name: `${profile.localizedFirstName} ${profile.localizedLastName}`,
          email: profile.emailAddress,
          image:
            profile.profilePicture["displayImage~"].elements[0].identifiers[0]
              .identifier,
        };
      },
    }),
  ],

  callbacks: {
    // After sign-in, upsert the executive into your own DB
    async signIn({ user }) {
      await fetch(`${process.env.NEXTAUTH_URL}/api/executives/upsert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          linkedInId: user.id,
          name: user.name,
          photoUrl: user.image,
        }),
      });
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
