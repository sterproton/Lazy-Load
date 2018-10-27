import React from 'react'
import './ArticleCard.scss'
import ContentLoader from 'react-content-loader'
import PropTypes from 'prop-types'
import moment from 'moment'

const ArticleLoader = props => (
  <ContentLoader
    rtl
    height={125}
    width={550}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    <rect x="14" y="25" rx="3" ry="3" width="350" height="6.4" />
    <rect x="11" y="65" rx="3" ry="3" width="380" height="6.4" />
    <rect x="16" y="108" rx="3" ry="3" width="201" height="6.4" />
  </ContentLoader>
)

const capture60Chars = (str) => {
  if (str.length > 60) {
    return `${str.slice(0, 60)}...`
  }
  return str
}

const getPastTime = (UTCSecond) => {
  const pastMinute = Math.floor(((new Date().getTime() / 1000) - UTCSecond) / 60)
  console.log(pastMinute)
  if (pastMinute < 60) {
    return `${pastMinute} minute ago`
  } else if (pastMinute < 120) {
    return '1 hours ago'
  }
  return `${(Math.floor(pastMinute / 60))} hours ago`
}


const ArticleCard = (props) => {
  const { isLoading } = props
  const ArticleReadingTime = 13
  if (isLoading) {
    return <ArticleLoader />
  }
  const {
    title, by, url, time,
  } = props
  return (
    <div className="article-card">
      <header>{title}</header>
      <div className="article-info">
        <span>{by}</span>
        <span>{getPastTime(time)}</span>
      </div>
      <div>{capture60Chars(url)}</div>
    </div>
  )
}

ArticleCard.propTyes = {
  isLoading: PropTypes.bool,
}

export default ArticleCard

