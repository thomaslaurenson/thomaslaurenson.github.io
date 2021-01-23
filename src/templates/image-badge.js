import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const ImageBadge = props => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(filter: { sourceInstanceName: { eq: "badges" } }) {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(maxWidth: 128, maxHeight: 128, quality: 95) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(props.filename)
      })
      if (!image) {
        return null
      }

      return (
        <Img
          title={props.title}
          alt={props.alt}
          fluid={image.node.childImageSharp.fluid}
        />
      )
    }}
  />
)

export default ImageBadge
