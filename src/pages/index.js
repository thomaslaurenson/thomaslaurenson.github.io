import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import HomeAbout from "../templates/home-about"
import HomeRandom from "../templates/home-random"
import HomeHeader from "../templates/home-header"

const Home = () => {
  return (
    <Layout>
      <SEO title="Home" />
      <HomeHeader />
      <HomeAbout />
      <HomeRandom />
    </Layout>
  )
}

export default Home
