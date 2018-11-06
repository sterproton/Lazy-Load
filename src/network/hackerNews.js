const axios = require('axios')

const HNAPI = {
  top: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
  new: 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty',
  best: 'https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty',
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
let asksIDArr = []
let showsIDArr = []
let jobsIDArr = []

const HNInit = async () => {
  [
    { data: newStoriesIDArr },
    { data: topStoriesIDArr },
    { data: bestStoriesIDArr },
    { data: asksIDArr },
    { data: showsIDArr },
    { data: jobsIDArr },
  ] = (await Promise.all(['new', 'top', 'best', 'ask', 'show', 'job'].map(item => axios.get(HNAPI[item]))))
}

const mapCategoryToIDArr = {
  index: () => newStoriesIDArr,
  new: () => newStoriesIDArr,
  top: () => topStoriesIDArr,
  best: () => bestStoriesIDArr,
  show: () => showsIDArr,
  ask: () => asksIDArr,
  jobs: () => jobsIDArr,
}

const fetchStoryByStep = async (category, step) => {
  const currentArr = mapCategoryToIDArr[category]()
  const IDs = currentArr.splice(0, step)
  const ret = await fetchItemsByIDs(IDs)
  return ret
}

const getIDArrLengthByCategory = category => mapCategoryToIDArr[category]().length

const HNProducer = {
  HNInit,
  fetchStoryByStep,
  getIDArrLengthByCategory,
}

export default HNProducer
