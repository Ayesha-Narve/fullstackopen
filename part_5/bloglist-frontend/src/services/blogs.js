import axios from 'axios'
let token = null
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export default {
  getAll,
  setToken
}