import React, { Component } from 'react'
import PropTypes from 'prop-types'
import replaceCorrespond from '../utils/tools'
import HNProducer from '../network/hackerNews'
import ArticleContainer from './ArticleContainer/ArticleContainer'


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


const fetchStoryByCategory = async (category, num) => {
  const adaptor = HNItem => ({
    ...HNItem,
    isLoading: false,
  })
  const stories = await HNProducer.fetchStoryByStep(category, num)
  return stories.map(adaptor)
}

const stateAfterUpdateCategoryArticleArr = (state, currentCategory, newArticleArr) => {
  const { store } = state
  const ret = {
    store: {
      ...store,
      [currentCategory]: [...newArticleArr],
    },
  }
  return ret
}

const stateAfterAddFetchedData = (prevState, currentCategory, fetchedData, loadingDataIndex) => {
  const newArticleArr = prevState.store[currentCategory]
    .map(replaceCorrespond(fetchedData, loadingDataIndex, fetchedData.length))
  return stateAfterUpdateCategoryArticleArr(prevState, currentCategory, newArticleArr)
}

const stateAfterAddLoadingData = (prevState, currentCategory, num) => {
  const newArticleArr = [...prevState.store[currentCategory], ...new Array(num).fill({
    isLoading: true,
  })]
  return stateAfterUpdateCategoryArticleArr(prevState, currentCategory, newArticleArr)
}

const getPathFromLocation = location => location.pathname.split('/')[1] || 'new'

class ArticleStore extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  state = {
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

  fetchAndSetOtherCategoryInitData = async (arr, current) => {
    const otherArr = arr.filter(item => item !== current)
    const data = await Promise.all(otherArr.map(item => fetchStoryByCategory(item, 10)))
    otherArr.forEach((category, index) => this.setState(prevState => ({
      store: {
        ...prevState.store,
        [category]: data[index],
      },
    })))
  }

  componentDidMount = async () => {
    const currentCategory = getPathFromLocation(this.props.location)
    document.body.onscroll = this.handleScroll
    await HNProducer.HNInit()
    let cardInfo
    try {
      const leftHNItemLength = HNProducer.getIDArrLengthByCategory(currentCategory)
      const fetchNum = leftHNItemLength > 10 ? 10 : leftHNItemLength
      cardInfo = await fetchStoryByCategory(currentCategory, fetchNum)
      this.fetchAndSetOtherCategoryInitData(['new', 'jobs', 'show', 'ask'], currentCategory)
    } catch (error) {
      console.log(error)
    }
    this.setState(prevState => stateAfterUpdateCategoryArticleArr(prevState, currentCategory, cardInfo))
  }

  handleScroll = async () => {
    const currentCategory = getPathFromLocation(this.props.location)
    const { store: { [currentCategory]: { length: loadingDataIndex } } } = this.state
    if (isReachBottom()) {
      const leftHNItemLength = HNProducer.getIDArrLengthByCategory(currentCategory)
      const fetchNum = leftHNItemLength > 10 ? 10 : leftHNItemLength
      this.setState(prevState => stateAfterAddLoadingData(prevState, currentCategory, fetchNum))
      let fetchedData = null
      try {
        fetchedData = await fetchStoryByCategory(currentCategory, fetchNum)
      } catch (error) {
        console.log('net work err', error)
      }
      this.setState(prevState => stateAfterAddFetchedData(prevState, currentCategory, fetchedData, loadingDataIndex))
    }
  }

  render() {
    const path = getPathFromLocation(this.props.location)
    const { store: { [path]: articleArr } } = this.state
    return (
      <ArticleContainer articleArr={articleArr} />
    )
  }
}


export default ArticleStore
