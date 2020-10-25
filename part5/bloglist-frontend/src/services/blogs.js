import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = tokenData => token = tokenData.token

const getAll = async () => {

  const response = await axios.get(baseUrl)
  return response

}

const create = async (title, author, url) => {

  const headersData = {
    headers: { Authorization: `bearer ${token}` }
  }

  const blogData = {
    title,
    author,
    url
  }

  const response = await axios
    .post(baseUrl, blogData, headersData)

  return response

}

const update = async (blog) => {

  const headersData = {
    headers: { Authorization: `bearer ${token}` }
  }

  const { user: { id }, likes, author, title, url } = blog

  const blogData = {
    user: id,
    likes,
    author,
    title,
    url,
  }

  const updateURL = `${baseUrl}/${blog.id}`

  const response = await axios
    .put(updateURL, blogData, headersData)

  return response

}

const remove = async (blog) => {

  const headersData = {
    headers: { Authorization: `bearer ${token}` }
  }

  const deleteURL = `${baseUrl}/${blog.id}`

  const response = await axios
    .delete(deleteURL, headersData)

  return response

}

export default { getAll, create, update, remove, setToken }