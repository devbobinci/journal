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
    };
  }

  return {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      mongodb_username: "journal-boi",
      mongodb_password: "a7eqfTKEOjq5KMu3",
      mongodb_clustername: "cluster0",
      mongodb_database: "journal",
    },
  };
};

module.exports = nextConfig;
