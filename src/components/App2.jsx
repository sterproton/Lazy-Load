import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import replaceCorrespond from '../utils/tools'
import HNProducer from '../network/hackerNews'
import ArticleContainer from './ArticleContainer/ArticleContainer'
import Header from './Header/Header'
import '../assets/scss/global.scss'
import '../assets/scss/index.scss'


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


const HNAdaptor = HNItem => ({
  ...HNItem,
  isLoading: false,
})

const fetchNewStories = async () => {
  const newHNStories = await HNProducer.fetchNewByStep(10)
  return newHNStories.map(HNAdaptor)
}

const fetchTopStories = async () => {
  const topHNStories = await HNProducer.fetchTopByStep(10)
  return topHNStories.map(HNAdaptor)
}

const fetchBestStories = async () => {
  const bestHNStories = await HNProducer.fetchBestByStep(10)
  return bestHNStories.map(HNAdaptor)
}

const stateAfterUpdateCategoryArticleArr = (state, articleArr) => {
  const { currentCategory, store } = state
  const ret = {
    currentCategory,
    store: {
      ...store,
      [currentCategory]: [...articleArr],
    },
  }
  return ret
}

const stateAfterAddFetchedData = (prevState, fetchedData, loadingDatasIndex) => {
  const newArticleArr = prevState.store[prevState.currentCategory].map(replaceCorrespond(fetchedData, loadingDatasIndex, fetchedData.length))
  return this.stateAfterUpdateCategoryArticleArr(prevState, newArticleArr)
}

const stateAfterAddLoadingData = (prevState) => {
  const newArticleArr = [...prevState.store[prevState.currentCategory], ...new Array(10).fill({
    isLoading: true,
  })]
  return this.stateAfterUpdateCategoryArticleArr(prevState, newArticleArr)
}

class App extends Component {
  state = {
    currentCategory: 'new',
    store: {
      new: new Array(10).fill({
        isLoading: true,
      }),
      ask: new Array(10).fill({
        isLoading: true,
      }),
      show: new Array(10).fill({
        isLoading: true,
      }),
      jobs: new Array(10).fill({
        isLoading: true,
      }),
    },
  }

  componentDidMount = async () => {
    document.body.onscroll = this.handleScroll
    await HNProducer.initNewStoriesIDArr()
    let cardInfo
    try {
      cardInfo = await fetchNewStories()
    } catch (error) {
      console.log(error)
    }
    this.setState(prevState => stateAfterUpdateCategoryArticleArr(prevState, cardInfo))
  }

  handleChangeCategory = (category) => {
    this.setState({
      currentCategory: category,
    })
  }

  handleScroll = async () => {
    const loadingDatasIndex = this.state.store[this.state.currentCategory].length
    if (isReachBottom()) {
      this.setState(prevState => stateAfterAddLoadingData(prevState))
      let fetchedData = null
      try {
        fetchedData = await fetchNewStories()
      } catch (e) {
        console.log('net work err')
      }
      this.setState(prevState => stateAfterAddFetchedData(prevState, fetchedData, loadingDatasIndex))
      // this.setState((prevState) => {
      //   const newArticleArr = prevState.articleArr.map(replaceCorrespond(fetchedData, loadingDatasIndex, fetchedData.length))
      //   // 每次拉到底部是都会先往里面填充{isLoading: false} 的数组，这里的index正好是新数据的替换掉Loading数据的index,也就是填充
      //   // loading前的index
      //   // const newArticleArr = [...prevState.articleArr.filter(item => item.isLoading === false), ...data]
      //   return {
      //     articleArr: newArticleArr,
      //   }
      // })
    }
  }


  render() {
    return (
      <div className="container">
        <Header handleChangeCategory={this.handleChangeCategory} />
        <ArticleContainer articleArr={this.state.store[this.state.currentCategory]} />
      </div>
    )
  }
}

export default App
