import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({
  children,
  interior = true,
}: {
  children: ReactNode;
  interior?: boolean;
}) {
  return (
    <div
      className={`flex min-h-screen flex-col bg-background ${interior ? "kd-stone-bg" : ""}`}
    >
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}