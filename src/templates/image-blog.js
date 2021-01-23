import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const ImageBlog = props => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(filter: { sourceInstanceName: { eq: "blog" }, extension: {eq: "png"} }) {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(maxWidth: 960, maxHeight: 200, quality: 95) {
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

      return <Img alt={props.alt} fluid={image.node.childImageSharp.fluid} />
    }}
  />
)

export default ImageBlog
