import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const username = process.env.INITIAL_ADMIN_USERNAME || "daloer9102";
const password = process.env.INITIAL_ADMIN_PASSWORD;
if (!url || !serviceKey || !password) throw new Error("Set NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and INITIAL_ADMIN_PASSWORD in .env.local");
if (password.length < 12) throw new Error("Use a strong temporary password of at least 12 characters.");
const supabase = createClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
const email = `${username}@admin.geniuszone.edu.bd`;
const { data, error } = await supabase.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { username } });
if (error) throw error;
const { error: profileError } = await supabase.from("admins").insert({ id: data.user.id, username, display_name: "School Administrator" });
if (profileError) throw profileError;
console.log(`Admin created. Login username: ${username}. Change the temporary password after first login.`);
