import axios from 'axios'
let token = null
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newBlog => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog)
  return response.data
}

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

export default {
  getAll,
  create,
  update,
  setToken
}