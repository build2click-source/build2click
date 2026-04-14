"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function CareerDNANavbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [targetAsmt, setTargetAsmt] = useState<{ id: string; status: string; attemptId: string | null } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hide navbar on login/register or assessment pages (Focus Mode)
  const isHidden = pathname === "/careerdna/login" || pathname === "/careerdna/register" || pathname?.startsWith("/careerdna/assessment/");

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/careerdna/attempt/module-progress")
        .then((r) => r.json())
        .then((data) => {
           // keeping it similar to the original navbar
        })
        .catch(() => {});
    }
  }, [status]);

  if (isHidden) return null;

  const isAdmin = (session?.user as any)?.role === "ADMIN";
  const assessmentLink = "/careerdna/dashboard";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between relative">
        <Link href="/careerdna" className="flex items-center gap-2 group">
          <div className="size-6 md:size-8 text-[#fb6a51]">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <span className="text-lg md:text-xl font-bold tracking-tight text-slate-900 group-hover:text-[#fb6a51] transition-all duration-300 truncate max-w-[150px] sm:max-w-none">
            Career DNA
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5">
          {status === "loading" ? (
            <span className="text-slate-400 animate-pulse text-sm">...</span>
          ) : session ? (
            <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
              <Link
                href={assessmentLink}
                className={`transition-all duration-300 hover:text-[#fb6a51] ${
                  pathname?.startsWith("/careerdna/dashboard") || pathname?.startsWith("/careerdna/results") ? "text-[#fb6a51]" : "text-slate-600"
                }`}
              >
                Dashboard
              </Link>
              <span className="text-slate-200">|</span>
              {isAdmin && (
                <>
                  <Link
                    href="/careerdna/admin"
                    className="text-[#fb6a51] font-bold hover:text-[#e55b44] transition-all duration-300"
                  >
                    Admin
                  </Link>
                  <span className="text-slate-200">|</span>
                </>
              )}
              <div className="flex items-center gap-1.5 px-1 py-1 rounded-lg group/user cursor-default">
                <svg className="size-4 text-slate-400 group-hover/user:text-[#fb6a51] transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-slate-500 whitespace-nowrap group-hover/user:text-[#fb6a51] transition-all duration-300">
                  Hi, {session.user.email?.split("@")[0]}
                </span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/careerdna" })}
                className="flex items-center gap-2 bg-[#fb6a51] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-sm hover:bg-[#e55b44] hover:shadow-md transition-all active:scale-95 group"
              >
                <svg className="size-4 group-hover:translate-x-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/careerdna/login" className="text-sm font-semibold text-slate-600 hover:text-[#fb6a51] transition-colors">Log in</Link>
              <Link href="/careerdna/register" className="px-5 py-2.5 rounded-full bg-[#fb6a51] text-white text-sm font-bold shadow-sm hover:bg-[#e55b44] hover:shadow-md transition-all active:scale-95">Start Free</Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-600 hover:text-[#fb6a51] focus:outline-none focus:text-[#fb6a51]"
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[64px] left-0 w-full bg-white border-b border-slate-200 shadow-xl py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          {status === "loading" ? (
            <span className="text-slate-400 animate-pulse text-sm">Loading...</span>
          ) : session ? (
            <div className="flex flex-col gap-4 text-sm font-medium text-slate-600">
              <div className="flex items-center gap-2 px-3 py-3 bg-slate-50 rounded-xl">
                <svg className="size-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-slate-700 font-bold tracking-tight">Hi, {session.user.email?.split("@")[0]}</span>
              </div>
              <Link
                href={assessmentLink}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-3 py-3 rounded-xl transition-colors ${
                  pathname?.startsWith("/careerdna/dashboard") || pathname?.startsWith("/careerdna/results") ? "bg-[#fb6a51]/5 text-[#fb6a51] font-bold" : "hover:bg-slate-50 border border-transparent hover:border-slate-100"
                }`}
              >
                Dashboard
              </Link>
              {isAdmin && (
                <Link
                  href="/careerdna/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-3 text-[#fb6a51] font-bold rounded-xl border border-transparent hover:bg-[#fb6a51]/5 hover:border-[#fb6a51]/20 transition-colors"
                >
                  Admin Portal
                </Link>
              )}
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => signOut({ callbackUrl: "/careerdna" })}
                  className="w-full flex items-center justify-center gap-2 bg-[#fb6a51] text-white px-5 py-3.5 rounded-xl font-bold shadow-sm hover:bg-[#e55b44] transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link href="/careerdna/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-5 py-3.5 rounded-xl border-2 border-slate-200 text-slate-700 font-bold hover:border-[#fb6a51] hover:text-[#fb6a51] transition-all">
                Log in
              </Link>
              <Link href="/careerdna/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-5 py-3.5 rounded-xl bg-[#fb6a51] text-white font-bold shadow-sm hover:bg-[#e55b44] transition-all">
                Start Free
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
