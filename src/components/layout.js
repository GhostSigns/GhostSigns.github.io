import * as React from 'react'
import Nav from './nav'
import Footer from './footer'

const Layout = ({ isHero, children }) => {
  return (
    <>
      <Nav isHero={isHero} />
      <main>
        {children}
        <Footer />
      </main>
    </>
  )
}
export default Layout