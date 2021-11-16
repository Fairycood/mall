import axios from "axios"
export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1.请求拦截
  instance.interceptors.request.use(config => {
    // 发送请求之前要做的事情
    return config
  },err => {
    // 对请求错误要做的事情
    console.log(err);
  })
  
  //2.2.响应拦截
  instance.interceptors.response.use(res => {
    // 对响应数据要做的事情
    return res
  },err => {
    // 对响应错误要做的事情
    console.log(err);
  })
  
  //3.发送真正的网络请求
  return instance(config)
}