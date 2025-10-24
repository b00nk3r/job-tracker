"use client";

import { useState } from "react";

async function postJSON(url: string, body: any) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Request failed");
  return data;
}

export default function AuthForms() {
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState<null | "signup" | "login">(null);

  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 420 }}>
      <h2>Sign up</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setErr(null);
          setLoading("signup");
          const fd = new FormData(e.currentTarget as HTMLFormElement);
          try {
            await postJSON("/api/auth/register", {
              email: fd.get("email"),
              password: fd.get("password"),
            });
            window.location.reload();
          } catch (e: any) {
            setErr(e.message);
          } finally {
            setLoading(null);
          }
        }}
      >
        <input name="email" type="email" placeholder="Email" required style={{ width: "100%", padding: 8, marginBottom: 8 }} />
        <input name="password" type="password" placeholder="Password" required minLength={4} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
        <button disabled={loading === "signup"}>{loading === "signup" ? "Creating..." : "Create account"}</button>
      </form>

      <h2>Login</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setErr(null);
          setLoading("login");
          const fd = new FormData(e.currentTarget as HTMLFormElement);
          try {
            await postJSON("/api/auth/login", {
              email: fd.get("email"),
              password: fd.get("password"),
            });
            window.location.href = "/"; // or "/applications" if you add that page
          } catch (e: any) {
            setErr(e.message);
          } finally {
            setLoading(null);
          }
        }}
      >
        <input name="email" type="email" placeholder="Email" required style={{ width: "100%", padding: 8, marginBottom: 8 }} />
        <input name="password" type="password" placeholder="Password" required style={{ width: "100%", padding: 8, marginBottom: 8 }} />
        <button disabled={loading === "login"}>{loading === "login" ? "Signing in..." : "Sign in"}</button>
      </form>

      {err && <p style={{ color: "crimson" }}>{err}</p>}
      <p style={{ fontSize: 12, opacity: 0.75 }}>
        Demo only: accounts are stored in memory and disappear on server restart.
      </p>
    </div>
  );
}
