import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import './ArticleContainer.scss'
import ArticleCard from '../sharedComp/ArticleCard/ArticleCard'

const waitMs = ms => new Promise(resolve => setTimeout(() => resolve(), ms))

const isReachBottom = () => {
  let isReach = false
  const scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight,
  )
  const ret = scrollHeight - window.pageYOffset - document.documentElement.clientHeight
  if (ret <= 1) {
    isReach = true
  }
  return isReach
}


export default class ArticleContainer extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  initArticleArr = new Array(10).fill({
    isLoading: true,
  })

  state = {
    articleArr: this.initArticleArr,
  }


  async componentDidMount() {
    const articleArr = await this.fetchData()
    document.body.onscroll = this.onBodyScroll

    this.setState({
      articleArr,
    })
  }

  onBodyScroll = async () => {
    if (isReachBottom()) {
      this.setState(prevState => ({
        articleArr: [...prevState.articleArr, ...new Array(10).fill({
          isLoading: true,
        })],
      }))

      const data = await this.fetchData()
      const newArticleArr = [...this.state.articleArr.filter(item => item.isLoading === false), ...data]
      this.setState({
        articleArr: newArticleArr,
      })
    }
  }


  fetchData = async () => {
    await waitMs(1000)
    return new Array(10).fill({
      title: 'No Innovation Without Representation',
      summary: 'Why the technology gap in Congress matters, and what we can do about it',
      authorName: 'Patrick Gothman',
      articleDate: new Date().toTimeString(),
      ArticleReadingTime: 13,
      isLoading: false,
    })
  }

  render() {
    const articleItems = this.state.articleArr.map((item, index) => <ArticleCard key={index} {... item} />)
    return (
      <div className="article-container">
        {articleItems}
      </div>
    )
  }
}

