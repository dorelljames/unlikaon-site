require('dotenv').config()
const strapiPluginOptions = {
  resolve: `gatsby-source-strapi`,
  options: {
    apiURL: `http://localhost:1337`,
    contentTypes: [
      // List of the Content Types you want to be able to request from Gatsby.
      `business`,
      `user`,
    ],
  },
}

/**
 * GraphQL query we upload to Algolia
 */
const query = `
{
  allStrapiBusiness {
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
      data.allStrapiBusiness.edges.map(({ node }) => node),
    indexName: process.env.ALGOLIA_INDEX_NAME
      ? process.env.ALGOLIA_INDEX_NAME
      : 'businesses',
  },
]

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
    strapiPluginOptions,
    {
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
    },
  ],
}