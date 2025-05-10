"use client";

import { useState } from "react";

export default function InviteExec() {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(null);

  const sendInvite = async () => {
    if (!input.trim()) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/invite-exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref: input.trim() }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("sent");
      setInput("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="invite-exec">
      <h3>Invite an Exec</h3>
      <p>Know someone great? Enter their email or LinkedIn URL:</p>
      <div className="invite-form">
        <input
          type="text"
          placeholder="jane.doe@company.com or linkedin.com/in/janedoe"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendInvite} disabled={status === "sending"}>
          <img src="/icons/arrow-right.svg" alt="Send" />
        </button>
      </div>
      {status === "sent" && (
        <p className="success">Invite sent! Thank you.</p>
      )}
      {status === "error" && (
        <p className="error">Please enter a valid address.</p>
      )}
    </section>
  );
}
