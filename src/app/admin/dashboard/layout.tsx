import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export default async function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = await cookies();
  const session = verifySessionToken(store.get(SESSION_COOKIE)?.value);

  if (!session) {
    redirect("/admin");
  }

  return <>{children}</>;
}
