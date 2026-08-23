import type { NextConfig } from "next";

const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHostname
      ? [
          {
            protocol: "https",
            hostname: supabaseHostname,
            pathname: "/storage/v1/object/sign/**",
          },
        ]
      : [],
    // In some sandboxed/NAT64 dev networks this hostname resolves to an
    // address Next's SSRF guard treats as "local". remotePatterns above
    // already pins requests to this one trusted Supabase project host, so
    // that guard is redundant here rather than protective.
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
