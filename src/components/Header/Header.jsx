import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss'

const Header = () => {
  const blocks = ['new', 'show', 'ask', 'jobs']

  const scrollToTop = () => window.scrollTo(0, 0)

  return (
    <header className="header">
      <div className="header-img"><img src="https://news.ycombinator.com/favicon.ico" alt="" /></div>
      <div className="block-wrap">
        {blocks.map(content => <NavLink activeClassName="active-header" onClick={scrollToTop} key={content} to={`/${content}`}>{content}</NavLink>)}
      </div>
    </header>
  )
}

export default Header
