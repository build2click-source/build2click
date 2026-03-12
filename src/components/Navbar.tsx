import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import MobileNav from "./MobileNav";

export default async function Navbar() {
    const supabase = await createClient();

    // 1. Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();

    // 2. If logged in, grab their profile to get the custom username
    let username = null;
    let isAdmin = false;
    if (user) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("username, role")
            .eq("id", user.id)
            .single();

        username = profile?.username || user.email?.split('@')[0];
        isAdmin = profile?.role === "ADMIN";
    }

    return (
        <MobileNav
            user={user}
            username={username}
            isAdmin={isAdmin}
        />
    );
}
