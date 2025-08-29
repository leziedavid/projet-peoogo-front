/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // Images tierces
            { protocol: "https", hostname: "www.uber-assets.com", pathname: "/**" },
            { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
            { protocol: "https", hostname: "another-example.com", pathname: "/**" },

            // Localhost (dev)
            { protocol: "http", hostname: "localhost", pathname: "/uploads/**" },

            // Domaine prod (toutes les images dans /uploads)
            { protocol: "https", hostname: "api.peoogo.com", pathname: "/uploads/**" },

            // Accès par IP (optionnel)
            { protocol: "http", hostname: "109.199.107.23", pathname: "/uploads/**" },
            { protocol: "https", hostname: "109.199.107.23", pathname: "/uploads/**" },
        ],
    },

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },

    // ⚡ Optionnel : désactive l’optimisation pour toutes les images externes
    experimental: {
        images: {
            unoptimized: true,
        },
    },
};

export default nextConfig;
