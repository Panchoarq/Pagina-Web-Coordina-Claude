/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Las fotos de proyectos son attachments de Airtable con URL temporal.
    // Se piden server-side en cada carga; aquí sólo autorizamos los hosts.
    remotePatterns: [
      { protocol: "https", hostname: "v5.airtableusercontent.com" },
      { protocol: "https", hostname: "dl.airtable.com" },
      { protocol: "https", hostname: "*.airtableusercontent.com" },
    ],
  },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
