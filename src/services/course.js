import requset from '@/utils/response'

// 获取课程
export function getQueryCourses (data) {
  return requset({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}
// 新增或更新课程
export function saveOrUpdateCourse (data) {
  return requset({
    method: 'POST',
    url: '/boss/course/saveOrUpdateCourse',
    data
  })
}
// 上下架状态改变
export function changeState (courseId, status) {
  return requset({
    method: 'GET',
    url: '/boss/course/changeState',
    params: {
      courseId,
      status
    }
  })
}
// 根据课程id获取课程信息
export function getCourseById (courseId) {
  return requset({
    method: 'GET',
    url: '/boss/course/getCourseById',
    params: {
      courseId
    }
  })
}
// 上传图片
export function uploadImage (data) {
  return requset({
    method: 'POST',
    url: '/boss/course/upload',
    data
  })
}
// 根据课程id获取课程章节信息
export function getSectionAndLesson (courseId) {
  return requset({
    method: 'GET',
    url: '/boss/course/section/getSectionAndLesson',
    params: {
      courseId
    }
  })
}
// 保存/更新课程内容
export function saveOrUpdateSection (data) {
  return requset({
    method: 'POST',
    url: '/boss/course/section/saveOrUpdateSection',
    data
  })
}
// 根据id获取章节信息
export function getBySectionId (sectionId) {
  return requset({
    method: 'GET',
    url: '/boss/course/section/getBySectionId',
    params: {
      sectionId
    }
  })
}

// 保存或更新课时
export function saveOrUpdateLesson (data) {
  return requset({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}
// 根据id获取课时内容

export function getBylessonId (lessonId) {
  return requset({
    method: 'GET',
    url: '/boss/course/lesson/getById',
    params: {
      lessonId
    }
  })
}
