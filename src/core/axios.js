import axios from 'axios'

axios.defaults.baseURL = '/simple-blog-webapp/api'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

export default axios
