import React from 'react'
import './ArticleCard.scss'
import ContentLoader from 'react-content-loader'
import PropTypes from 'prop-types'

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

const ArticleCard = (props) => {
  const { isLoading } = props
  // const summary = 'Why the technology gap in Congress matters, and what we can do about it'
  // const title = 'No Innovation Without Representation'
  // const authorName = 'Patrick Gothman'
  // const articleDate = new Date().toDateString()
  // const ArticleReadingTime = 13
  if (isLoading) {
    return <ArticleLoader />
  }
  const {summary, title, authorName, articleDate, ArticleReadingTime} = props
  return (
    <div className="article-card">
      <header>{title}</header>
      <p className="article-summary">
        {summary}
      </p>
      <div className="article-author">
        {authorName}
      </div>
      <div className="article-info">
        <span>
          {articleDate}
        </span>
        <span>
          {`${ArticleReadingTime}min read`}
        </span>
      </div>
    </div>
  )
}

ArticleCard.propTyes = {
  isLoading: PropTypes.bool,
}

export default ArticleCard

