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


const HNAdaptor = HNItem => ({
  ...HNItem,
  isLoading: false,
})

const fetchStoryByCategory = async (category) => {
  const stories = await HNProducer.fetchStoryByStep(category, 10)
  return stories.map(HNAdaptor)
}

const stateAfterUpdateCategoryArticleArr = (state, currentCategory, articleArr) => {
  const { store } = state
  const ret = {
    store: {
      ...store,
      [currentCategory]: [...articleArr],
    },
  }
  return ret
}

const stateAfterAddFetchedData = (prevState, currentCategory, fetchedData, loadingDatasIndex) => {
  const newArticleArr = prevState.store[currentCategory].map(replaceCorrespond(fetchedData, loadingDatasIndex, fetchedData.length))
  return stateAfterUpdateCategoryArticleArr(prevState,currentCategory, newArticleArr)
}

const stateAfterAddLoadingData = (prevState, currentCategory) => {
  const newArticleArr = [...prevState.store[currentCategory], ...new Array(10).fill({
    isLoading: true,
  })]
  return stateAfterUpdateCategoryArticleArr(prevState,currentCategory, newArticleArr)
}

const getPathFromLocation = location => location.pathname.split('/')[1] || 'new'

class ArticleStore extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  state = {
    store: {
      new: [],
      ask: [],
      show: [],
      jobs: [],
    },
  }

  componentDidMount = async () => {
    const currentCategory = getPathFromLocation(this.props.location)
    document.body.onscroll = this.handleScroll
    await HNProducer.HNInit()
    let cardInfo
    try {
      cardInfo = await fetchStoryByCategory(currentCategory)
    } catch (error) {
      console.log(error)
    }
    this.setState(prevState => stateAfterUpdateCategoryArticleArr(prevState, currentCategory, cardInfo))
  }

  handleScroll = async () => {
    const currentCategory = getPathFromLocation(this.props.location)
    const loadingDatasIndex = this.state.store[currentCategory].length
    if (isReachBottom()) {
      this.setState(prevState => stateAfterAddLoadingData(prevState, currentCategory))
      let fetchedData = null
      try {
        fetchedData = await fetchStoryByCategory(currentCategory)
      } catch (e) {
        console.log('net work err')
      }
      this.setState(prevState => stateAfterAddFetchedData(prevState, currentCategory, fetchedData, loadingDatasIndex))
    }
  }

  render() {
    const path = getPathFromLocation(this.props.location)
    return (
      <ArticleContainer articleArr={this.state.store[path]} />
    )
  }
}

export default ArticleStore
