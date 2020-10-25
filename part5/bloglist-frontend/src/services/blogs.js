import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = tokenData => {
  token = tokenData
}

const getAll = async () => {
  try {

    const response = await axios.get(baseUrl)
    return response.data

  } catch (err) {
    return err
  }
}

const create = async (title, author, url) => {

  try {

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

  } catch (err) {
    return err
  }
}

export default { getAll, create, setToken }