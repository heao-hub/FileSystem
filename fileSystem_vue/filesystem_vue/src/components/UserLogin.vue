<template>
  <div class="login-container">
    <div class="login-box">
      <h2 class="title">档案管理系统</h2>

      <el-form :model="form" ref="formRef" label-width="0" class="login-form">
        <el-form-item>
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            clearable
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
            clearable
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="login-btn"
            :loading="loading"
            @click="handleLogin"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import jwtDecode from 'jwt-decode'

export default {
  data() {
    return {
      form: { username: '', password: '' },
      loading: false
    }
  },
  methods: {
    async handleLogin() {
      if (!this.form.username || !this.form.password) {
        this.$message.warning('请输入用户名和密码')
        return
      }

      this.loading = true
      try {
        const res = await login(this.form)
        const token = res.data.token || res.data // 有的接口直接返回字符串
        if (!token) {
          this.$message.error('登录失败，未获取到令牌')
          this.loading = false
          return
        }

        // ✅ 保存 token
        localStorage.setItem('token', token)

        // ✅ 从 JWT 中解析用户信息
        const user = jwtDecode(token)
        localStorage.setItem('user', JSON.stringify(user))

        this.$message.success('登录成功')

        // ✅ 登录成功后跳转主界面
        this.$router.push('/layout')
      } catch (err) {
        this.$message.error('用户名或密码错误')
        console.error('登录错误:', err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-box {
  width: 380px;
  padding: 40px 50px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: fadeIn 0.8s ease;
}
.title {
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
  font-weight: bold;
}
.login-form {
  text-align: left;
}
.login-btn {
  width: 100%;
  height: 42px;
  font-size: 16px;
  border-radius: 8px;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
