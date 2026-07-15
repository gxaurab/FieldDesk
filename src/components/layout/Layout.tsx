import { type ReactNode } from "react";
import { Header } from "./Header";
import { Nav } from "./Nav";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Nav />
      <main>{children}</main>
    </div>
  );
}