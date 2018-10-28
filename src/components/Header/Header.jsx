import React from 'react'
import Block from './Block'
import './Header.scss'

const Header = () => {
  const blocks = ['new', 'comments', 'show', 'ask', 'jobs']
  return (
    <div className="header">
      <div className="header-img"><img src="https://news.ycombinator.com/favicon.ico" alt="" /></div>
      <div className="block-wrap">
        {blocks.map(content => <Block content={content} />)}
      </div>
    </div>
  )
}

export default Header
