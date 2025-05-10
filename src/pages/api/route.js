// Example for Pages router: src/pages/api/invite-exec.js
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { ref } = req.body;
  if (!ref) return res.status(400).send("Missing reference");

  // Simple email regex check
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ref);
  if (!isEmail) {
    // (Optionally) try to parse LinkedIn profile → email, or reject
    return res.status(400).send("Please supply a valid email");
  }

  const inviteLink = `${process.env.NEXT_PUBLIC_BASE_URL}/register?ref=${encodeURIComponent(ref)}`;

  const msg = {
    to: ref,
    from: "hello@execandme.com",
    subject: "You’ve been invited to ExecAndMe",
    html: `
      <p>Someone you know thinks you’d make a great Exec on ExecAndMe.</p>
      <p><a href="${inviteLink}"
        style="background:#002D62;color:#fff;padding:10px 20px;border-radius:4px;text-decoration:none;">
        Register in 30 seconds
      </a></p>
    `,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error sending");
  }
}
