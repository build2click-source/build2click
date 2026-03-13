import { signup } from "@/app/(survey)/personality-app/login/actions";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import PasswordInput from "@/components/PasswordInput";

export default async function SignupPage(props: { searchParams: Promise<{ message: string }> }) {
    const searchParams = await props.searchParams;

    return (
        <div className="min-h-[80vh] flex items-center justify-center animate-in fade-in zoom-in duration-500">
            <div className="w-full max-w-md p-8 rounded-3xl bg-foreground/[0.02] border border-foreground/5 shadow-2xl backdrop-blur-sm relative overflow-hidden">

                {/* Decorative background glow */}
                <div className="absolute top-0 right-1/2 translate-x-1/2 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="bg-purple-500/10 p-4 rounded-2xl">
                            <UserPlus className="w-8 h-8 text-purple-500" />
                        </div>
                    </div>

                    <h2 className="text-3xl font-extrabold text-center mb-2">Create Account</h2>
                    <p className="text-center text-foreground/60 mb-8 text-sm">Join to take the test and save your results.</p>

                    <form className="flex flex-col gap-4" action={signup}>
                        <div className="space-y-1">
                            <label className="text-sm font-medium pl-1 text-foreground/80" htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="spiritual_seeker99"
                                required
                                className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                            />
                        </div>

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
                                className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm font-medium pl-1 text-foreground/80" htmlFor="password">
                                Password
                            </label>
                            <PasswordInput
                                name="password"
                                placeholder="••••••••"
                                minLength={6}
                                className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all pr-12"
                            />
                        </div>

                        {searchParams?.message && (
                            <p className="mt-2 p-3 bg-red-500/10 text-red-500 text-sm text-center rounded-xl border border-red-500/20">
                                {searchParams.message}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="mt-6 w-full bg-purple-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-purple-700 transition-all active:scale-95 shadow-lg shadow-purple-500/30"
                        >
                            Start Journey
                        </button>
                        <div className="text-center mt-4">
                            <span className="text-sm text-foreground/60">Already have an account? </span>
                            <Link href="/enneagram/login" className="text-sm font-semibold text-purple-600 hover:underline">
                                Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
