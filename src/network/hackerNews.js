const axios = require('axios')

const HNAPI = {
  topStories: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
  newStories: 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty',
  bestStories: 'https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty',
  ask: 'https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty',
  show: 'https://hacker-news.firebaseio.com/v0/showstories.json?print=pretty',
  job: 'https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty',
}


const fetchItemInfoByID = async (itemID) => {
  const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`)
  return data
}

const fetchUserInfoByUserID = async (userID) => {
  const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/user/${userID}.json?print=pretty`)
  return data
}

const fetchItemsByIDs = async itemIDs => Promise
  .all(itemIDs.map(itemID => fetchItemInfoByID(itemID)))

/**
 * 在文件模块内部保存的ID队列，用来分页用，当ID代表的Item被fetch后，Array会pop掉相应的数个ID
 * 如果Arr长度为零，则再获取数据就返回[],应在获得数据时进行判断。
 */
let newStoriesIDArr = []
let topStoriesIDArr = []
let bestStoriesIDArr = []
let latestAsksIDArr = []
let latestShowsIDArr = []
let latestJobsIDArr = []

const initNewStoriesIDArr = async () => {
  const { data } = await axios.get(HNAPI.newStories)
  newStoriesIDArr = data
}

const HNInit = async () => {
  newStoriesIDArr = (await axios.get(HNAPI.newStories)).data
  topStoriesIDArr = (await axios.get(HNAPI.topStories)).data
  bestStoriesIDArr = (await axios.get(HNAPI.bestStories)).data
  latestAsksIDArr = (await axios.get(HNAPI.ask)).data
  latestShowsIDArr = (await axios.get(HNAPI.show)).data
  latestJobsIDArr = (await axios.get(HNAPI.job)).data
}

// const initTopStoriesIDArr = async () => {
//   const { data } = await axios.get(HNAPI.topStories)
//   topStoriesIDArr = data
// }

// const initBestStoriesIDArr = async () => {
//   const { data } = await axios.get(HNAPI.bestStories)
//   bestStoriesIDArr = data
// }

// const initLatestAsksIDArr = async () => {
//   const { data } = axios.get(HNAPI.ask)
//   latestAsksIDArr = data
// }

// const initLatestShowsIDArr = async () => {
//   const { data } = axios.get(HNAPI.show)
//   latestShowsIDArr = data
// }

// const initLatestJobIDArr = async () => {
//   const { data } = axios.get(HNAPI.job)
//   latestJobsIDArr = data
// }


// const fetchNewByStep = async (num) => {
//   const IDs = newStoriesIDArr.splice(0, num)
//   const ret = await fetchItemsByIDs(IDs)
//   return ret
// }

// const fetchTopByStep = async (num) => {
//   const IDs = topStoriesIDArr.splice(0, num)
//   const ret = await fetchItemsByIDs(IDs)
//   return ret
// }

// const fetchBestByStep = async (num) => {
//   const IDs = bestStoriesIDArr.splice(0, num)
//   const ret = await fetchItemsByIDs(IDs)
//   return ret
// }

// const fetchAskByStep = async (num) => {
//   const IDs = latestAsksIDArr.splice(0, num)
//   const ret = await fetchItemsByIDs(IDs)
//   return ret
// }

// const fetchShowByStep = async (num) => {
//   const IDs = latestShowsIDArr.splice(0, num)
//   const ret = await fetchItemsByIDs(IDs)
//   return ret
// }

// const fetchJobByStep = async (num) => {
//   const IDs = latestJobsIDArr.splice(0, num)
//   const ret = await fetchItemsByIDs(IDs)
//   return ret
// }


const mapCategoryToIDArr = {
  new: () => newStoriesIDArr,
  top: () => topStoriesIDArr,
  best: () => bestStoriesIDArr,
  show: () => latestShowsIDArr,
  ask: () => latestAsksIDArr,
  jobs: () => latestJobsIDArr,
}

const fetchStoryByStep = async (category, step) => {
  const currentArr = mapCategoryToIDArr[category]()
  const IDs = currentArr.splice(0, step)
  console.log(IDs)
  const ret = await fetchItemsByIDs(IDs)
  return ret
}

const HNProducer = {
  HNInit,
  fetchStoryByStep,
}

export default HNProducer
