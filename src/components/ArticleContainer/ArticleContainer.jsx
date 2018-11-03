import React, { Component } from 'react'
import './ArticleContainer.scss'
import PropTypes from 'prop-types'
import ArticleCard from '../sharedComp/ArticleCard/ArticleCard'
import HNProducer from '../../network/hackerNews'
import replaceCorrespond from '../../utils/tools'


// const HNAdaptor = HNItem => ({
//   ...HNItem,
//   isLoading: false,
// })

// const fetchNewStories = async () => {
//   const newHNStories = await HNProducer.fetchNewByStep(10)
//   return newHNStories.map(HNAdaptor)
// }

// const isReachBottom = () => {
//   let isReach = false
//   const scrollHeight = Math.max(
//     document.body.scrollHeight, document.documentElement.scrollHeight,
//     document.body.offsetHeight, document.documentElement.offsetHeight,
//     document.body.clientHeight, document.documentElement.clientHeight,
//   )
//   const ret = scrollHeight - window.pageYOffset - document.documentElement.clientHeight
//   if (ret <= 1) {
//     isReach = true
//   }
//   return isReach
// }


export default class ArticleContainer extends Component {
  static propTypes = {
    articleArr: PropTypes.arrayOf(PropTypes.shape({
      by: PropTypes.string,
      time: PropTypes.number,
      title: PropTypes.string,
      url: PropTypes.string,
    })).isRequired,
  }

  // initArticleArr = new Array(10).fill({
  //   isLoading: true,
  // })

  // state = {
  //   articleArr: this.initArticleArr,
  // }


  // async componentDidMount() {
  //   window.addEventListener('scroll', this.onBodyScroll, false)
  //   await HNProducer.initNewStoriesIDArr()
  //   const cardInfo = await fetchNewStories()
  //   this.setState({
  //     articleArr: cardInfo,
  //   })
  // }

  // onBodyScroll = async () => {
  //   const loadingDatasIndex = this.state.articleArr.length
  //   if (isReachBottom()) {
  //     this.setState(prevState => ({
  //       articleArr: [...prevState.articleArr, ...new Array(10).fill({
  //         isLoading: true,
  //       })],
  //     }))
  //     let fetchedData = null
  //     try {
  //       fetchedData = await fetchNewStories()
  //     } catch (e) {
  //       console.log('net work err')
  //     }
  //     this.setState((prevState) => {
  //       const newArticleArr = prevState.articleArr.map(replaceCorrespond(fetchedData, loadingDatasIndex, fetchedData.length))
  //       // 每次拉到底部是都会先往里面填充{isLoading: false} 的数组，这里的index正好是新数据的替换掉Loading数据的index,也就是填充
  //       // loading前的index
  //       // const newArticleArr = [...prevState.articleArr.filter(item => item.isLoading === false), ...data]
  //       return {
  //         articleArr: newArticleArr,
  //       }
  //     })
  //   }
  // }

  render() {
    const articleItems = this.props.articleArr.map((item, index) => <ArticleCard key={index} {... item} />)
    return (
      <div className="article-container">
        {articleItems}
      </div>
    )
  }
}
