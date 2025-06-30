import type { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 px-4">
        {children}
      </main>
      <footer className="bg-gray-100 py-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Support Desk. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
