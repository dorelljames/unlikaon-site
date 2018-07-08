import React from 'react'
import Link from 'gatsby-link'
import {
	InstantSearch,
	SearchBox,
	Hits,
	RefinementList,
} from 'react-instantsearch-dom'

const HitComponent = ({ hit, data }) => (
	<div>
		<img src={data.apiUrl + hit.banner.url} />
		<h3>{hit.name}</h3>
		<small>Addr: {hit.address}</small>
	</div>
)

const IndexPage = ({ data }) => (
	<div>
		<h2>Search anything below...</h2>
		<InstantSearch
			appId={data.site.siteMetadata.algolia.appId}
			apiKey={data.site.siteMetadata.algolia.searchOnlyApiKey}
			indexName={data.site.siteMetadata.algolia.indexName}
		>
			<SearchBox placeholder="Search for shrimp, chicken, anything here..." />
			<RefinementList attribute="categories.name" />
			<Hits
				hitComponent={hit => (
					<HitComponent hit={hit.hit} data={data.site.siteMetadata} />
				)}
			/>
		</InstantSearch>
	</div>
)

export default IndexPage

export const query = graphql`
	query SiteInfoQuery {
		site {
			siteMetadata {
				title
				apiUrl
				algolia {
					appId
					searchOnlyApiKey
					indexName
				}
			}
		}
	}
`
