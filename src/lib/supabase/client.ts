import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vieuyzspuhvdjyznomfn.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_IiBwVUOMaBnMOTtNQKeAew_1mlxMTNZ"
  );
}
