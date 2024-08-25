import * as React from 'react'
import Layout from '../components/layout'
import { useState } from 'react'
import { Waypoint } from 'react-waypoint'
import SEO from '../components/seo'


const scrollToComm = (e) => {
  const commSection = document.getElementById("communicationSection");
  e.preventDefault()
  commSection &&
     commSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

const IndexPage = () => {
  const [isHero, setIsHero] = useState(true)
  return (
    <Layout isHero={isHero}>
            <Waypoint onEnter={() => setIsHero(true)} onLeave={() => setIsHero(false)} topOffset={100}>
                <div className="hero-container">
                    <div className="hero-container-sub">
                        <div className="container">
                            <div className="row">
                                <div className="offset-lg-2 col-lg-8">
                                    <div className="hero-content text-center">
                                        <h1></h1>
                                        <p></p>
                                        <div className="hero-cta">
                                            <a className="btn" href="javascript:void(0)" onClick={(e) => scrollToComm(e)} rel="nofollow">Discover Ghost Signs</a>
                                        </div>                                  
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ Waypoint>
    </Layout>
  )
}

export default IndexPage

export const Head = () => (
    <SEO article={false} />
)