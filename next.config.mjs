/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "www.uber-assets.com" },
            { protocol: "https", hostname: "res.cloudinary.com" },
            { protocol: "https", hostname: "another-example.com" },

            // Localhost (dev seulement)
            { protocol: "http", hostname: "localhost", pathname: "/uploads/**" },

            // Domaine prod (toutes les images dans /uploads)
            { protocol: "https", hostname: "api.peoogo.com", pathname: "/uploads/**" },
            { protocol: "https", hostname: "api.peoogo.com"},

            // Accès par IP (optionnel si tu veux aussi tester en direct)
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
};

export default nextConfig;
