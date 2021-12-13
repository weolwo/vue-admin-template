import request from '@/utils/request'

// 获取spu列表
// GET /admin/product/{page}/{limit}
export const reqSpuList = (page, limit, category3Id) => {
  return request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })
}

// GET /admin/product/getSpuById/{spuId}
// 获取spu基本信息
export const reqSpuInfo = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })

// 获取spu图片列表
// GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

// 获取销售属性
// /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => request({ url: `/admin/product/baseSaleAttrList`, method: 'get' })

// 获取品牌列表
// GET /admin/product/baseTrademark/getTrademarkList
export const reqTrademarkList = () => request({ url: `/admin/product/baseTrademark/getTrademarkList`, method: 'get' })

// 保存和更新spu
// POST /admin/product/saveSpuInfo
// POST /admin/product/updateSpuInfo

export const reqAddOrUpdateSpu = (spuInfo) => {
  if (spuInfo.id) {
    return request({ url: `/admin/product/updateSpuInfo`, method: 'post', data: spuInfo })
  } else {
    return request({ url: `/admin/product/saveSpuInfo`, method: 'post', data: spuInfo })
  }
}

// 删除spu
// DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'get' })
