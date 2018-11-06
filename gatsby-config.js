require('dotenv').config()

const strapiPluginOptions = {
  resolve: `gatsby-source-strapi`,
  options: {
    apiURL: process.env.API_URL ? process.env.API_URL : 'http://localhost:1337',
    contentTypes: [
      // List of the Content Types you want to be able to request from Gatsby.
      `businesses`,
      `users`,
    ],
  },
}

const gaPluginOptions = {
  resolve: `gatsby-plugin-google-analytics`,
  options: {
    trackingId: process.env.GA_TRACK_ID || '',
    // Puts tracking script in the head instead of the body
    head: true,
    // Setting this parameter is optional
    anonymize: true,
    // Setting this parameter is also optional
    respectDNT: true,
    // Avoids sending pageview hits from custom paths
    exclude: [],
  },
}

/**
 * GraphQL query we upload to Algolia
 */
const query = `
{
  allStrapiBusinesses {
    edges {
      node {
        objectID: id
        categories {
          name
        }
        banner {
          url
        }
        name
        address
      }
    }
  }
}
`

/**
 * Gatsby Algolia plugin option
 * @type {Array}
 */
const queries = [
  {
    query,
    transformer: ({ data }) =>
      data.allStrapiBusinesses.edges.map(({ node }) => node),
    indexName: process.env.ALGOLIA_INDEX_NAME
      ? process.env.ALGOLIA_INDEX_NAME
      : 'businesses',
  },
]

const algoliaPluginOptions = {
  resolve: `gatsby-plugin-algolia`,
  options: {
    appId: process.env.ALGOLIA_APP_ID
      ? process.env.ALGOLIA_APP_ID
      : 'DAUF2TCV69',
    apiKey: process.env.ALGOLIA_ADMIN_API_KEY
      ? process.env.ALGOLIA_ADMIN_API_KEY
      : '97088904f2f0400b5ae9d7b2c0d7b1b4',
    indexName: process.env.ALGOLIA_INDEX_NAME
      ? process.env.ALGOLIA_INDEX_NAME
      : 'businesses',
    queries,
    chunkSize: 10000, // default: 1000
  },
}

module.exports = {
  siteMetadata: {
    title: 'Unli Kaon - Cebu Edition',
    apiUrl: process.env.API_URL ? process.env.API_URL : 'http://localhost/',
    algolia: {
      appId: process.env.ALGOLIA_APP_ID ? process.env.ALGOLIA_APP_ID : '',
      searchOnlyApiKey: process.env.ALGOLIA_SEARCH_ONLY_API_KEY
        ? process.env.ALGOLIA_SEARCH_ONLY_API_KEY
        : '',
      indexName: process.env.ALGOLIA_INDEX_NAME
        ? process.env.ALGOLIA_INDEX_NAME
        : 'businesses',
    },
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
    strapiPluginOptions,
    gaPluginOptions,
    algoliaPluginOptions,
  ],
}
