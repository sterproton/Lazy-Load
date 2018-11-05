import React, { Component } from 'react'
import './ArticleContainer.scss'
import PropTypes from 'prop-types'
import ArticleCard from '../sharedComp/ArticleCard/ArticleCard'

export default class ArticleContainer extends Component {
  static propTypes = {
    articleArr: PropTypes.arrayOf(PropTypes.shape({
      by: PropTypes.string,
      time: PropTypes.number,
      title: PropTypes.string,
      url: PropTypes.string,
    })).isRequired,
  }

  render() {
    const articleItems = this.props.articleArr.map((item, index) => <ArticleCard key={index} {... item} />)
    return (
      <div className="article-container">
        {articleItems}
      </div>
    )
  }
}
