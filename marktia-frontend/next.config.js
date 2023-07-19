/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/marktia",
                permanent: true
            }
        ]
    },
    output: 'standalone'
}

module.exports = nextConfig
