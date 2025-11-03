<template>
  <el-container class="layout-container">
    <!-- 左侧导航栏 -->
    <el-aside width="220px" class="sidebar">
      <div class="logo">
        <i class="el-icon-folder"></i>
        <span>档案管理系统</span>
      </div>

      <el-menu
        :default-active="$route.path"
        background-color="#1e1e2f"
        text-color="#bdbdbd"
        active-text-color="#409EFF"
        router
        class="menu"
      >
        <el-menu-item index="/user">
          <i class="el-icon-user"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="/file">
          <i class="el-icon-document"></i>
          <span slot="title">文件管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主体内容 -->
    <el-container>
      <!-- 顶部栏 -->
      <el-header class="header">
        <div class="header-right">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <i class="el-icon-user-solid"></i>
               系统管理
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 内容区 -->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      username: '管理员'
    }
  },
  methods: {
    logout() {
      this.$confirm('确定退出登录吗？', '提示', { type: 'warning' }).then(() => {
        localStorage.removeItem('token')
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}

.sidebar {
  background-color: #1e1e2f;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid #333;
}

.menu {
  flex: 1;
  border-right: none;
}

.header {
  background: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 60px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  padding-right: 30px;
}

.header-right .el-dropdown-link {
  cursor: pointer;
  color: #333;
}

.main {
  background: #f7f8fa;
  padding: 20px;
  overflow-y: auto;
  height: calc(100vh - 60px);
}
</style>
