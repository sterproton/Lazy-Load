import React from 'react'
import './ArticleCard.scss'
import ContentLoader from 'react-content-loader'
import PropTypes from 'prop-types'

const ArticleLoader = props => (
  <ContentLoader
    rtl
    height={100}
    width={770}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
    {...props}
  >
    <rect x="11" y="13.84" rx="3" ry="3" width="640.5" height="13.18" />
    <rect x="11.91" y="48.31" rx="3" ry="3" width="231.8" height="9.41" />
    <rect x="16" y="108" rx="3" ry="3" width="201" height="6.4" />
    <rect x="11" y="75.36" rx="3" ry="3" width="619.4" height="9.28" />
  </ContentLoader>
)

const capture80Chars = (str) => {
  if (str.length > 80) {
    return `${str.slice(0, 80)}...`
  }
  return str
}

const getPastTime = (UTCSecond) => {
  const pastMinute = Math.floor(((new Date().getTime() / 1000) - UTCSecond) / 60)
  if (pastMinute < 60) {
    return `${pastMinute} minute ago`
  } if (pastMinute < 120) {
    return '1 hours ago'
  } if(pastMinute < 1440) {
    return `${(Math.floor(pastMinute / 60))} hours ago`
  }
  return `${Math.floor(pastMinute / 1440)} days ago`
}


const ArticleCard = (props) => {
  const { isLoading } = props
  const ArticleReadingTime = 13
  if (isLoading) {
    return (
      <div className="article-card">
        <ArticleLoader />
      </div>
    )
  }

  const clickToURL = URL => () => {
    document.location.href = URL
  }

  const {
    title, by, url, time,
  } = props

  return (
    <div className="article-card">
      <header>
        <a href={url} target="_blank" rel="noopener noreferrer">{title}</a>
      </header>
      <div className="article-info">
        <span>{by}</span>
        <span>{getPastTime(time)}</span>
      </div>
      {url ? (<div><a href={url} target="_blank" rel="noopener noreferrer">{capture80Chars(url)}</a></div>) : null }
    </div>
  )
}

ArticleCard.propTyes = {
  isLoading: PropTypes.bool,
}

export default ArticleCard
