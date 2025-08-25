/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [
            { protocol: "https", hostname: "www.uber-assets.com" },
            { protocol: "https", hostname: "res.cloudinary.com" },
            { protocol: "https", hostname: "another-example.com" },
            { protocol: "http", hostname: "localhost" },
            { protocol: 'https', hostname: 'api.pegoog.com', port: '4000', pathname: '**' },
            { protocol: "http", hostname: "109.199.107.23", port: "4000" },
            { protocol: "https", hostname: "api.pegoog.com", port: "4000" },
        ],
    },

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },


};

export default nextConfig;
