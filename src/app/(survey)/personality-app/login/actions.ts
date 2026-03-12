"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    };

    // Pre-flight check: see if the account exists
    const { data: profile } = await supabase
        .from("profiles")
        .select("id, role")
        .eq("email", data.email)
        .single();

    if (!profile) {
        return redirect(`/per-app/signup?message=Account not created. Please sign up here.`);
    }

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        return redirect(`/per-app/login?message=${error.message}`);
    }

    revalidatePath("/", "layout");

    if (profile.role === "ADMIN") {
        redirect("/per-app");
    } else {
        redirect("/per-app/test?welcome=true");
    }
}

export async function signup(formData: FormData) {
    const supabase = await createClient();

    const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        options: {
            data: {
                username: formData.get("username") as string,
            }
        }
    };

    const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: data.options
    });

    if (error) {
        return redirect(`/per-app/signup?message=${error.message}`);
    }

    revalidatePath("/", "layout");
    redirect("/per-app/test?welcome=true");
}
