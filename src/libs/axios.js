import Axios from 'axios'

function authRequestInterceptor(config) {
  const token = localStorage.getItem('access_token')
  config.headers = config.headers ?? {}
  if (token) {
    config.headers.Authorization = token
  }
  config.headers.Accept = 'application/json'
  return config
}

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

axios.interceptors.request.use(authRequestInterceptor)
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axios
