/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www3.animeflv.net',
        },
        {
          protocol: 'https',
          hostname: 'a.storyblok.com',
        },
        {
          protocol: 'https',
          hostname: 'myanimelist.net',
        },
         {
          protocol: 'https',
          hostname: 'cdn.myanimelist.net',
        },
        {
          protocol: 'https',
          hostname: 'upload.wikimedia.org',
        },
      ],
    },
  };
  
  export default nextConfig;
