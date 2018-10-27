const axios = require('axios')

const HNAPI = {
  topStories: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
  newStories: 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty',
  bestStories: 'https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty',
}


// export const getItemInfoByID = async itemID => axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`)
// export const getUserInfoByUserID = async userID => axios.get(`https://hacker-news.firebaseio.com/v0/user/${userID}.json?print=pretty`)

// export const fetchNewStoriesIDs = async () => axios.get(HNAPI.topStories)
// export const fetchTopStoriesIDs = async () => axios.get(HNAPI.topStories)
// export const fetchBestStoriesIDs = async () => axios.get(HNAPI.bestStories)


let newStoriesIDArr = []

const fetchItemInfoByID = async (itemID) => {
  const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`)
  return data
}

const fetchUserInfoByUserID = async (userID) => {
  const { data } = await axios.get(`https://hacker-news.firebaseio.com/v0/user/${userID}.json?print=pretty`)
  return data
}


const fetchNewStoriesIDs = async () => {
  const { data } = await axios.get(HNAPI.topStories)
  return data
}

const fetchTopStoriesIDs = async () => {
  const { data } = await axios.get(HNAPI.topStories)
  return data
}

const fetchBestStoriesIDs = async () => {
  const { data } = await axios.get(HNAPI.bestStories)
  return data
}

const fetchItemsByIDs = async itemIDs => Promise
  .all(itemIDs.map(itemID => fetchItemInfoByID(itemID)))

const getNewBy = async (num) => {
  const IDs = newStoriesIDArr.splice(0, num)
  const ret = await fetchItemsByIDs(IDs)
  return ret
}

const initStoriesIDArr = async () => {
  newStoriesIDArr = await fetchNewStoriesIDs()
}

const HNProducer = {
  initStoriesIDArr,
  getNewBy,
}

export default HNProducer

