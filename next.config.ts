import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.uber-assets.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com', // ✅ Corrigé ici
            },
            {
                protocol: 'https',
                hostname: 'another-example.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '/uploads/**',
            },
            {
                protocol: 'http',
                hostname: '195.110.35.237',
                port: '4000',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: '195.110.35.237',
                port: '4000',
                pathname: '**',
            },
        ],
    },
};

export default nextConfig;
