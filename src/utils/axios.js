import axios from 'axios'
const second = 1000
axios.defaults.timeout = second * 30
axios.interceptors.response.use(
    response => {
        if (response.data.code === 0) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    err => {
        return Promise.reject(err)
    }
)

export default axios