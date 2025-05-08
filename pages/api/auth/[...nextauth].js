// File: pages/api/auth/[...nextauth].js

import NextAuth from "next-auth"

console.log("🔑 NextAuth config loaded at", new Date())

export default NextAuth({
  // used to sign cookies and tokens
  secret: process.env.NEXTAUTH_SECRET,

  // turn on debug so you see each step in your logs
  debug: true,

  providers: [
    {
      id:      "linkedin",
      name:    "LinkedIn",
      type:    "oauth",
      version: "2.0",

      // 1) Ask for the legacy scopes, not openid
      authorization: {
        url: "https://www.linkedin.com/oauth/v2/authorization",
        params: {
          response_type: "code",
          scope:         "r_liteprofile r_emailaddress"
        }
      },

      // 2) Token exchange endpoint
      token: "https://www.linkedin.com/oauth/v2/accessToken",

      // 3) We’ll fetch profile+email ourselves—leave userinfo blank
      userinfo: "",

      clientId:     process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,

      // 4) Build the user object from LinkedIn’s REST APIs
      async profile(profile, tokens) {
        // fetch the “me” endpoint
        const meRes = await fetch(
          "https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~:playableStreams))",
          { headers: { Authorization: `Bearer ${tokens.access_token}` } }
        )
        const me = await meRes.json()

        // fetch the email endpoint
        const emailRes = await fetch(
          "https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))",
          { headers: { Authorization: `Bearer ${tokens.access_token}` } }
        )
        const emailJson = await emailRes.json()
        const email =
          emailJson.elements?.[0]?.["handle~"]?.emailAddress || null

        return {
          id:    me.id,
          name:  `${me.localizedFirstName} ${me.localizedLastName}`,
          email,
          image:
            me.profilePicture?.["displayImage~"]?.elements?.[0]
              ?.identifiers?.[0]?.identifier ||
            null
        }
      }
    }
  ],

  // 5) Persist access token if you need it
  callbacks: {
    async jwt({ token, account }) {
      if (account) token.accessToken = account.access_token
      return token
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      return session
    }
  },

  // 6) Log everything so you can see any errors
  logger: {
    error(code, ...rest) {
      console.error("NextAuth Error:", code, ...rest)
    },
    warn(code, ...rest) {
      console.warn ("NextAuth Warn: ", code, ...rest)
    },
    debug(code, ...rest) {
      console.debug("NextAuth Debug:", code, ...rest)
    }
  }
})
