<template>
  <div class="login">
    <span class="title">{{ login_title }}</span>
    <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="80px"
    label-position='top'>
      <el-form-item label="手机号" prop="phone">
        <el-input type="text" v-model="form.phone"></el-input>
      </el-form-item>
        <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userLogin } from '@/services/user'
export default {
  name: 'login',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      isLoading: false,
      login_title: 'EDU BOSS 管理系统',
      // 规则校验
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1\d{10}$/, message: '请输入正确手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码位数6~8位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.isLoading = true
        // 验证校验是否通过
        await this.$refs.form.validate()
        const { data } = await userLogin(this.form)
        this.isLoading = false
        // console.log(data)
        if (data.state === 1) {
          this.$message.success('登录成功')
          this.$store.commit('addUser', data.content)
          this.$router.push(this.$route.query.redirect || '/')
        } else {
          this.$message.error('登录失败')
        }
      } catch (err) {
        console.log('校验没有通过')
        this.isLoading = false
      }
    }
  }
}
</script>
<style lang='scss' scoped>
  .login{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
    .title{
      font-size: 40px;
      margin-bottom: 80px;
      font-weight: bold;
      color: rgb(117, 115, 115);
    }
    .el-form{
      width: 300px;
      background-color: #fff;
      padding: 20px 20px;
      .el-button{
        width: 100%;
      }
    }
  }
</style>
