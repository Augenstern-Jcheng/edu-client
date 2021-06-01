import Axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = Axios.create({

  // timeout: 2000

})

function getBaseUrl (url) {
  if (url.startsWith('/boss')) {
    return 'http://eduboss.lagou.com'
  } else {
    return 'http://edufront.lagou.com'
  }
}
// 跳转login
function redircetLogin () {
  router.push({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
// 设置请求拦截器
request.interceptors.request.use(config => {
  // console.log(config)
  // 设置baseUrl
  config.baseURL = getBaseUrl(config.url)
  // 设置请求头
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
})

// 设置响应拦截器
request.interceptors.response.use(function (response) {
  // 状态码为 2xx 都会进入这里
  // console.log('请求响应成功了：', response)
  return response
}, function (error) {
  // 超出 2xx 都会进入这里
  if (error.response) {
    // 请求发送成功，也收到了响应，到状态码超过了2xx（常见错误处理位置）
    // 1. 保存状态码
    const { status } = error.response
    // 2. 判断
    let errorMessage = ''
    if (status === 400) {
      errorMessage = '请求参数错误'
    } else if (status === 401) {
      // token 无效
      // 情况1：没有Token
      if (!store.state.user) {
        redircetLogin()
        return Promise.reject(error)
      }
      // 情况2：存在Token,重新请求新的Token
      return request({
        method: 'POST',
        url: '/front/user/refresh_token',
        data: qs.stringify({ refreshtoken: store.state.user.refresh_token })
      }).then(res => {
        // 情况1：如果没有请求到新的token，返回登录页面重新登录并清除无效的用户信息
        if (res.data.state !== 1) {
          // 清除信息
          store.commit('addUser', null)
          // 重新登录
          redircetLogin()
          return Promise.reject(error)
        }
        // 情况2：请求成功
        // 将新的数据存储到本地
        store.commit('addUser', res.data.content)
        // 将之前的错误请求，重新发送
        return request(error.config)
      }).catch(() => {
        // 清除信息
        store.commit('addUser', null)
        // 重新登录
        redircetLogin()
        return Promise.reject(error.config)
      })
    } else if (status === 403) {
      errorMessage = '没有权限，请联系管理员'
    } else if (status === 404) {
      errorMessage = '请求资源不存在'
    } else if (status >= 500) {
      errorMessage = '服务端错误，请联系管理员'
    }
    Message.error(errorMessage)
  } else if (error.request) {
    // 请求发送成功，但没有收到响应
    Message.error('请求超时，请重试')
  } else {
    // 在设置请求时发生了一些失去，触发了错误（未知型错误）
    Message.error(`请求失败${error.message}`)
  }
  // 将请i失败的错误对象继续抛出，传递给接收响应的处理函数
  return Promise.reject(error)
})

export default request
