import requset from '@/utils/response'

// 获取阿里云图片上传凭证
export function aliyunImageUploadAddressAndAuth () {
  return requset({
    method: 'GET',
    url: '/boss/course/upload/aliyunImagUploadAddressAdnAuth.json'
  })
}

// 获取阿里云视频上传凭证（有两个请求参数）
export function aliyunVideoUploadAddressAndAuth (params) {
  return requset({
    method: 'GET',
    url: '/boss/course/upload/aliyunVideoUploadAddressAdnAuth.json',
    params
  })
}

// 阿里云转码请求
export function aliyunVideoTrancode (data) {
  return requset({
    method: 'POST',
    url: '/boss/course/upload/aliyunTransCode.json',
    data
  })
}

// 阿里云转码进度
export function getAliyunTranscodePercent (lessonId) {
  return requset({
    method: 'GET',
    url: '/boss/course/upload/aliyunTransCodePercent.json',
    params: {
      lessonId
    }
  })
}
