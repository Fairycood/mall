import { request } from "./request";

//获取首页头部主要数据
export function getMultiData() {
  return request({
    url: '/home/multidata'
  })
}
//获取首页商品列表
export function getGoods(type, page) {
  return request({
    url: 'home/data',
    params: {
      type,
      page
    }
  })
}