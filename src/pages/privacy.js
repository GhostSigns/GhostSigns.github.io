import * as React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

const PrivacyPage = () => {
    return (
        <Layout isHero={true} simpleNav={true}>
            <div className='policy'>
                        <div className="container">
                            <div className="policies-container">
                                <div className="policies-header">
                                    <h1 className="text-center">Privacy Policy</h1>
                                </div>
                                <div className="policies-content">
                                    
                                </div>
                            </div>
                        </div>
            </div>
        </Layout>
    )
}

export default PrivacyPage

export const Head = () => (
    <SEO title="Privacy Policy" article={false} />
)