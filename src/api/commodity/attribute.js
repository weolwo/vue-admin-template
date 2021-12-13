import request from '@/utils/request'
// 获取一级分类数据
// GET /admin/product/getCategory1
export const reqGetClassification1List = () => request({ url: '/admin/product/getCategory1', method: 'get' })

// 获取二级分类数据
// GET /admin/product/getCategory2/{category1Id}
export const reqGetClassification2List = (category1Id) => request({
  url: `/admin/product/getCategory2/${category1Id}`,
  method: 'get'
})

// 获取三级分类数据
// GET /admin/product/getCategory3/{category2Id}
export const reqGetClassification3List = (category2Id) => request({
  url: `/admin/product/getCategory3/${category2Id}`,
  method: 'get'
})

// 获取平台属性值数据
// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqGetAttributeInfoList = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get'
})

// 新增和修改属性
// POST /admin/product/saveAttrInfo
export const reqSaveOrUpdateAttributeInfo = (data) => request({
  url: `/admin/product/saveAttrInfo`,
  method: 'post',
  data: data
})
