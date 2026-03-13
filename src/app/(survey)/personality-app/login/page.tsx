import { login } from "./actions";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import PasswordInput from "@/components/PasswordInput";

export default async function LoginPage(props: { searchParams: Promise<{ message: string }> }) {
    const searchParams = await props.searchParams;

    return (
        <div className="min-h-[80vh] flex items-center justify-center animate-in fade-in zoom-in duration-500">
            <div className="w-full max-w-md p-8 rounded-3xl bg-foreground/[0.02] border border-foreground/5 shadow-2xl backdrop-blur-sm relative overflow-hidden">

                {/* Decorative background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="bg-primary/10 p-3 rounded-2xl">
                            <Sparkles className="w-8 h-8 text-primary" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-extrabold text-center mb-2">Welcome Back</h2>
                    <p className="text-center text-foreground/60 mb-8 text-sm">Sign in to view your test results.</p>

                    <form className="flex flex-col gap-4" action={login}>
                        <div className="space-y-1">
                            <label className="text-sm font-medium pl-1 text-foreground/80" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium pl-1 text-foreground/80" htmlFor="password">
                                Password
                            </label>
                            <PasswordInput
                                name="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all pr-12"
                            />
                        </div>

                        {searchParams?.message && (
                            <p className="mt-2 p-3 bg-red-500/10 text-red-500 text-sm text-center rounded-xl border border-red-500/20">
                                {searchParams.message}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="mt-6 w-full bg-foreground text-background font-semibold py-3 px-4 rounded-xl hover:bg-foreground/90 transition-all active:scale-95"
                        >
                            Sign In
                        </button>
                        <div className="text-center mt-4">
                            <span className="text-sm text-foreground/60">Don&apos;t have an account? </span>
                            <Link href="/enneagram/signup" className="text-sm font-semibold text-primary hover:underline">
                                Create Account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
