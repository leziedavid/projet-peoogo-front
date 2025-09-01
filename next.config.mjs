/** @type {import('next').NextConfig} */
const nextConfig = {
    // Autoriser tous les domaines HTTP et HTTPS pour les images
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
        ],
    },

    // Redirection vers HTTPS (optionnel)
    //   async redirects() {
    //     return [
    //       {
    //         source: '/:path*',
    //         destination: 'https://peoogo.com/:path*',
    //         permanent: true,
    //       },
    //     ];
    //   },

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

// ✅ Export correct pour ESM
export default nextConfig;
