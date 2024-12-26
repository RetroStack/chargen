import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  pathPrefix: `chargen`,
  siteMetadata: {
    title: `TRS-80 Model 1 Debugging`,
    pathPrefix: `/chargen`,
    siteUrl: `https://retrostack.github.io/chargen`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-emotion",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [],
      },
    },
    "gatsby-plugin-sitemap", 
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    },
  ],
};

export default config;
