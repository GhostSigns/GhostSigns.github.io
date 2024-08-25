import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'
import { useState } from 'react'
import { Waypoint } from 'react-waypoint'
import SEO from '../components/seo'

const AboutPage = () => {
    const [isHero, setIsHero] = useState(true)
    return (
        <Layout isHero={isHero}>
            <header className="about-page-header">
                <h1>About Clevedon Ghost Signs</h1>
                <h3></h3>
            </header>
            <Waypoint onEnter={() => setIsHero(true)} onLeave={() => setIsHero(false)} topOffset={100} />
            <div className="about-container">
                <div className="container">
                    <div className="row about-content mb-5">
                        <div className="col-lg-6">
                            <p><span></span></p>
                            <p></p>
                        </div>
                        <div className="offset-lg-1 col-lg-5">
                            <div className="about-img-container">
                                {/* <StaticImage src='../images/' /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AboutPage

export const Head = () => (
    <SEO title="About" description="" article={false} />
)
