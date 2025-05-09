// File: pages/auth/signin.js
import { getProviders, signIn } from "next-auth/react"

export default function SignIn({ providers }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", padding: "4rem"
    }}>
      <h1>Sign in</h1>
      {Object.values(providers).map(provider => (
        <button
          key={provider.name}
          onClick={() => signIn(provider.id)}
          style={{
            marginTop: "1rem", padding: "0.75rem 1.5rem",
            backgroundColor: "#0077B5", color: "#fff",
            border: "none", borderRadius: "4px",
            fontSize: "1rem", cursor: "pointer",
          }}
        >
          Sign in with {provider.name}
        </button>
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return { props: { providers } }
}
