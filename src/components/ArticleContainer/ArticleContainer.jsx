import React, { Component } from 'react'
import './ArticleContainer.scss'
import ArticleCard from '../sharedComp/ArticleCard/ArticleCard'
import HNProducer from '../../network/hackerNews'

const HNAdaptor = HNItem => ({
  ...HNItem,
  isLoading: false,
})

const fetchNewStories = async () => {
  const newHNStories = await HNProducer.fetchNewByStep(10)
  return newHNStories.map(HNAdaptor)
}

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
    document.body.onscroll = this.onBodyScroll
    await HNProducer.initNewStoriesIDArr()
    const cardInfo = await fetchNewStories()
    this.setState({
      articleArr: cardInfo,
    })
  }

  onBodyScroll = async () => {
    if (isReachBottom()) {
      this.setState(prevState => ({
        articleArr: [...prevState.articleArr, ...new Array(10).fill({
          isLoading: true,
        })],
      }))

      const data = await fetchNewStories()
      console.log(data)
      const newArticleArr = [...this.state.articleArr.filter(item => item.isLoading === false), ...data]
      this.setState({
        articleArr: newArticleArr,
      })
    }
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

