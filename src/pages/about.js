import React from 'react'
import Link from 'gatsby-link'

const AboutPage = ({ data }) => (
  <ul>
    {data.allStrapiBusinesses.edges.map(document => (
      <li key={document.node.id}>
        <h2>
          <Link to={`/${document.node.id}`}>{document.node.name}</Link>
        </h2>
        <p>{document.node.address}</p>
      </li>
    ))}
  </ul>
)

export default AboutPage

export const pageQuery = graphql`
  query IndexQuery {
    allStrapiBusinesses {
      edges {
        node {
          id
          categories {
            id
            name
          }
          name
          address
        }
      }
    }
  }
`
