import { cookies } from "next/headers";
import { getUserBySession } from "@/lib/store";
import AuthForms from "@/components/AuthForms";
import LogoutButton from "@/components/LogoutButton";

export const dynamic = "force-dynamic";

export default async function Home() {
  const sid = (await cookies()).get("sid")?.value;
  const user = getUserBySession(sid);

  return (
    <main style={{ minHeight: "100dvh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 720, padding: 24, border: "1px solid #e5e7eb", borderRadius: 12 }}>
        <h1 style={{ marginTop: 0 }}>Job Tracker — MVP Skeleton</h1>

        {user ? (
          <>
            <p>Welcome, <b>{user.email}</b> 🎉</p>
            <p>This is the landing page. You are authenticated.</p>
            <LogoutButton />
          </>
        ) : (
          <>
            <p>Welcome! Create an account or sign in to continue.</p>
            <AuthForms />
          </>
        )}

        <hr style={{ margin: "24px 0" }} />

        <p style={{ fontSize: 12, color: "#555" }}>
          Next steps: add <code>/app/applications/page.tsx</code> and protected API routes to manage your job applications.
        </p>
      </div>
    </main>
  );
}