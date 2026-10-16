import type { NextConfig } from 'next';
// Vercel production builds serve the site from the vegmax.in custom domain.
if (process.env.VERCEL_ENV === 'production' && !process.env.NEXT_PUBLIC_SITE_URL) process.env.NEXT_PUBLIC_SITE_URL = 'https://vegmax.in';
const config: NextConfig = { output: 'export', trailingSlash: true, basePath: process.env.NEXT_PUBLIC_BASE_PATH || '', images: { unoptimized: true }, poweredByHeader: false };
export default config;
