"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = {
    name: string;
    placeholder?: string;
    minLength?: number;
    className?: string;
};

export default function PasswordInput({ name, placeholder, minLength, className }: PasswordInputProps) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative">
            <input
                id={name}
                name={name}
                type={show ? "text" : "password"}
                placeholder={placeholder}
                required
                minLength={minLength}
                className={className || "w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all pr-12"}
            />
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground transition-colors p-1"
                aria-label={show ? "Hide password" : "Show password"}
            >
                {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
        </div>
    );
}
