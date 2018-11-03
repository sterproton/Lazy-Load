import React from 'react'
import { Link } from 'react-router-dom'
import './Header.scss'

const Header = (props) => {
  const blocks = ['new', 'show', 'ask', 'jobs']

  return (
    <div className="header">
      <div className="header-img"><img src="https://news.ycombinator.com/favicon.ico" alt="" /></div>
      <div className="block-wrap">
        {blocks.map(content => <Link key={content} to={`/${content}`}>{content}</Link>)}
      </div>
    </div>
  )
}

export default Header
