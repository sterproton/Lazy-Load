import React from 'react'
import './Block.scss'

const Block = (props) => {
  const { content } = props
  return (
    <div className="header-block">
      {content}
    </div>
  )
}

export default Block
