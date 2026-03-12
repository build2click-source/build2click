"use client";

import { useState } from "react";
import Link from "next/link";
import { Compass, User, LogIn, LogOut, Menu, X } from "lucide-react";
import { logout } from "./actions";

type NavProps = {
    user: any;
    username: string | null;
    isAdmin: boolean;
};

export default function MobileNav({ user, username, isAdmin }: NavProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full z-50 bg-primary/5 backdrop-blur-lg border-b border-foreground/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/per-app" className="flex items-center gap-2 group">
                        <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                            <Compass className="w-6 h-6 text-primary" />
                        </div>
                        <span className="font-bold text-xl tracking-tight">Essence</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden sm:flex items-center gap-4">
                        <Link href="/per-app/test" className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap">
                            Take the Test
                        </Link>

                        {isAdmin && (
                            <>
                                <div className="h-4 w-px bg-foreground/15"></div>
                                <Link href="/per-app/admin" className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors whitespace-nowrap">
                                    Admin
                                </Link>
                            </>
                        )}

                        <div className="h-4 w-px bg-foreground/15"></div>

                        {!user ? (
                            <Link href="/per-app/login" className="flex items-center gap-2 text-sm font-medium bg-foreground/5 hover:bg-foreground/10 px-4 py-2 rounded-full transition-all active:scale-95">
                                <LogIn className="w-4 h-4" />
                                <span>Sign In</span>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-2 sm:gap-4">
                                <span className="text-sm font-medium flex items-center gap-2 text-foreground/70 whitespace-nowrap">
                                    <User className="w-4 h-4 hidden sm:block" />
                                    <span>Hi, {username}</span>
                                </span>
                                <form action={logout}>
                                    <button className="flex items-center gap-2 text-sm font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 px-4 py-2 rounded-full transition-all active:scale-95 border border-red-500/20">
                                        <LogOut className="w-4 h-4" />
                                        <span>Logout</span>
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="sm:hidden flex items-center">
                        {user && (
                            <span className="text-sm font-medium text-foreground/70 mr-3">
                                Hi, {username}
                            </span>
                        )}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-md text-foreground hover:bg-foreground/5 focus:outline-none transition-colors"
                            aria-label="Toggle navigation menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isOpen && (
                <div className="sm:hidden bg-background border-b border-foreground/10 shadow-lg absolute w-full animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 pt-2 pb-4 space-y-1 flex flex-col items-center text-center">
                        <Link
                            href="/per-app/test"
                            onClick={() => setIsOpen(false)}
                            className="block px-3 py-3 rounded-md text-base font-medium hover:text-primary hover:bg-foreground/5 transition-colors w-full"
                        >
                            Take the Test
                        </Link>

                        {isAdmin && (
                            <Link
                                href="/per-app/admin"
                                onClick={() => setIsOpen(false)}
                                className="block px-3 py-3 rounded-md text-base font-semibold text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors w-full"
                            >
                                Admin
                            </Link>
                        )}

                        <div className="w-full h-px bg-foreground/10 my-2"></div>

                        {!user ? (
                            <Link
                                href="/per-app/login"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center gap-2 w-full px-3 py-3 text-base font-medium bg-foreground text-background hover:bg-foreground/90 rounded-xl transition-colors"
                            >
                                <LogIn className="w-5 h-5" />
                                Sign In
                            </Link>
                        ) : (
                            <div className="flex flex-col items-center gap-3 w-full">
                                <form action={logout} className="w-full">
                                    <button
                                        type="submit"
                                        className="flex items-center justify-center gap-2 w-full px-3 py-3 text-base font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-xl transition-colors border border-red-500/20"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        Logout
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
