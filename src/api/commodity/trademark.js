import request from '@/utils/request'

// /admin/product/baseTrademark/{page}/{limit}

export function reqGetTrademarkList(page = 1, limit) {
  return request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
  })
}

// 添加品牌
// POST /admin/product/baseTrademark/save
// put /admin/product/baseTrademark/update
export function reqAddOrUpdateTrademark(trademark) {
  // id 存在表示更新，否则为新增
  if (trademark.id) {
    return request({
      url: `/admin/product/baseTrademark/update`,
      method: 'put',
      data: trademark
    })
  } else {
    return request({
      url: `/admin/product/baseTrademark/save`,
      method: 'post',
      data: trademark
    })
  }
}

//删除品牌
// /admin/product/baseTrademark/remove/{id}
export function reqDeleteTrademark(id) {
  return request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
  })
}
