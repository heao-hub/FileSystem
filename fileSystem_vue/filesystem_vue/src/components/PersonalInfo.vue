<template>
  <div class="card">
    <el-card shadow="hover">
      <div slot="header" class="header-flex">
        <span class="card-title">个人信息</span>
      </div>

      <el-form :model="form" label-width="100px" class="info-form">
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled></el-input>
        </el-form-item>

        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password" show-password placeholder="请输入新密码"></el-input>
        </el-form-item>

        <el-form-item label="角色">
          <el-input :value="formatRole(form.role)" disabled></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="save">保存修改</el-button>
          <el-button @click="getInfo">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getInfo, updateInfo } from '@/api/info'

export default {
  data() {
    return {
      form: {
        username: '',
        name: '',
        gender: 1,
        password: '',
        role: 1
      }
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const res = await getInfo()
      this.form = { ...res.data }
    },
    async save() {
      await updateInfo(this.form)
      this.$message.success('修改成功')
      localStorage.setItem('user', JSON.stringify(this.form)) // 更新缓存
    },
    formatRole(role) {
      return { 1: '浏览者', 2: '上传者', 3: '管理员' }[role] || '-'
    }
  }
}
</script>

<style scoped>
.card {
  max-width: 600px;
  margin: 40px auto;
  background: #fff;
  border-radius: 8px;
}
.card-title {
  font-size: 18px;
  font-weight: 600;
}
.info-form {
  margin-top: 20px;
}
</style>
