/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "journal-boi",
        mongodb_password: "a7eqfTKEOjq5KMu3",
        mongodb_clustername: "cluster0",
        mongodb_database: "journal-dev",
        nextauth_url: "http://localhost:3000",
      },
      images: {
        domains: ["platform-lookaside.fbsbx.com", "lh3.googleusercontent.com"],
      },
    };
  }

  return {
    reactStrictMode: true,
    swcMinify: true,
    images: {
      domains: ["platform-lookaside.fbsbx.com", "lh3.googleusercontent.com"],
    },
    env: {
      mongodb_username: "journal-boi",
      mongodb_password: "a7eqfTKEOjq5KMu3",
      mongodb_clustername: "cluster0",
      mongodb_database: "journal",
    },
  };
};

module.exports = nextConfig;
