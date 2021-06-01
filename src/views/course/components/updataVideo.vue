<template>
<div class='up-data-video'>
  <el-page-header @back="$router.push(`/${courseId}/course-content`)" content="上传视频">
  </el-page-header>
  <el-divider></el-divider>
  <el-form>
    <el-form-item label="上传视频:" class="videoPercent">
      <input type="file" ref="videoFile">
          <el-form-item label="视频上传进度:">
            <el-progress
              style="width:500px"
              :text-inside="true"
              :stroke-width="20"
              :status="loadPercent===100 ? 'success' : ''"
              :percentage="loadPercent"></el-progress>
          </el-form-item>
    </el-form-item>
    <el-form-item label="上传视频封面:">
      <input type="file" ref="photoFile">
    </el-form-item>
    <el-divider></el-divider>
    <el-form-item>
      <el-button @click="handleUpVideo" type="info">开始上传</el-button>
      <el-button @click="$router.push(`/${courseId}/course-content`)" type="info">返回</el-button>
    </el-form-item>
    <el-divider></el-divider>
    <el-form-item label="视频转码进度:" v-if="loadPercent===100">
            <el-progress
              style="width:500px"
              :text-inside="true"
              :stroke-width="20"
              :status="videTranscodePercent===100 ? 'success' : ''"
              :percentage="videTranscodePercent"></el-progress>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
/* eslint-disable */
import {
        aliyunImageUploadAddressAndAuth,
        aliyunVideoUploadAddressAndAuth,
        aliyunVideoTrancode,
        getAliyunTranscodePercent
      } from '@/services/aliyun'
export default {
  name: 'UpDataVideo',
  props: ['courseId', 'lessonId'],
  data () {
    return {
      uploader: '',
      uploadAddressAndAuth: null,
      // 存储image的URL,请求视频凭证需要
      imageUrl: '',
      videoId: null,
      // 视频上传进度
      loadPercent: 0,
      // 视频转码进度
      videTranscodePercent: 0
    }
  },
  created () {
    this.loadUpAliyun()
  },
  methods: {
    // 上传按钮
    handleUpVideo () {
      // 初始化进度
      this.loadPercent = 0
      this.videTranscodePercent =0
      // 获取input里面的文件
      const video = this.$refs.videoFile.files[0]
      const photo = this.$refs.photoFile.files[0]
      // 将文件添加到上传列表
      this.uploader.addFile(photo)
      this.uploader.addFile(video)
      // 开始上传  触发onUploadstarted事件
      this.uploader.startUpload()
    },
    loadUpAliyun () {
      // console.log(this.uploader)
      this.uploader = new window.AliyunUpload.Vod({
        // 阿里账号ID，必须有值
        userId: '1618139964448548',
        // 上传到视频点播的地域，默认值为'cn-shanghai'，//eu-central-1，ap-southeast-1
        region: '',
        // 分片大小默认1 MB，不能小于100 KB
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async uploadInfo => {
          // console.log(uploadInfo)
          if (uploadInfo.isImage) {
            // 进行图片凭证请求
            const { data } = await aliyunImageUploadAddressAndAuth()
            if (data.code === '000000') {
              // console.log(data)
              this.uploadAddressAndAuth = data.data
              this.imageUrl = data.data.imageURL
            }
          } else {
            // 视频凭证请求aliyunVideoUploadAddressAndAuth
            const { data } = await aliyunVideoUploadAddressAndAuth({
              fileName: uploadInfo.file.name,
              imageUrl: this.imageURL
            })
            if (data.code === '000000') {
              this.uploadAddressAndAuth = data.data
              // console.log(data.data)
              this.videoId = data.data.videoId
            }
          }
          // aliyun上传凭证
          this.uploader.setUploadAuthAndAddress(
            uploadInfo,
            this.uploadAddressAndAuth.uploadAuth,
            this.uploadAddressAndAuth.uploadAddress,
            this.uploadAddressAndAuth.imageId || this.uploadAddressAndAuth.videoId
          )
        },
        // 文件上传成功
        onUploadSucceed: function (uploadInfo) {
        },
        // 文件上传失败
        onUploadFailed: function (uploadInfo, code, message) {
        },
        // 文件上传进度，单位：字节
        onUploadProgress: (uploadInfo, totalSize, loadedPercent) => {
          if (!uploadInfo.isImage) {
            this.loadPercent = Math.floor(loadedPercent * 100)
          }
        },
        // 上传凭证或STS token超时
        onUploadTokenExpired: function (uploadInfo) {
        },
        // 全部文件上传结束
        onUploadEnd: async uploadInfo => {
          // console.log(this.$refs.videoFile.files[0].name)
          // 进行视频转码
          const { data } = await aliyunVideoTrancode({
                lessonId: this.lessonId,
                coverImageUrl: this.imageUrl,
                fileName: this.$refs.videoFile.files[0].name,
                fileId: this.videoId
          })
          if (data.code === '000000') {
            const time = setInterval(async () => {
              const { data } = await getAliyunTranscodePercent(this.lessonId)
              if (data.code === '000000') {
                this.videTranscodePercent = data.data
                if (data.data === 100) {
                clearInterval(time)
                this.$message.success('转码完成')
                }
              }
            }, 1000)
          }
        }
      })
    }
  }
}

</script>
<style  lang='scss' scoped>
::v-deep .el-form-item__content{
    display: flex;
    justify-items: center;
    align-items: center;
    .el-progress-bar__outer{
      margin-top: 10px;
    }
  }
</style>
