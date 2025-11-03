<script>
import { getUserList, addUser, updateUser, deleteUser } from '@/api/user'

export default {
  data() {
    return {
      query: { name: '', gender: '', page: 1, pageSize: 10 },
      userList: [],
      total: 0,
      user: JSON.parse(localStorage.getItem('user') || '{}'),
      dialogVisible: false,
      dialogTitle: '新增用户',
      form: { id: null, username: '', password: '', name: '', gender: 1, role: 1 },
      deleteDialogVisible: false,
      deleteUserId: null,
      deleteUserName: ''
    }
  },
  created() {
    // ✅ 非管理员跳转到个人信息页
    if (this.user.role !== 3) {
      this.$message.warning('只有管理员才能访问用户管理')
      this.$router.replace('/info')
      return
    }
    this.getList()
  },
  computed: {
    isAdmin() {
      return this.user.role === 3
    }
  },
  methods: {
    async getList() {
      const res = await getUserList(this.query)
      this.userList = res.data.rows
      this.total = res.data.total
    },
    resetQuery() {
      this.query = { name: '', gender: '', page: 1, pageSize: 10 }
      this.getList()
    },
    handlePageChange(p) {
      this.query.page = p
      this.getList()
    },
    formatRole(row) {
      return { 1: '浏览者', 2: '上传者', 3: '管理员' }[row.role] || '-'
    },
    openDialog() {
      this.dialogTitle = '新增用户'
      this.form = { id: null, username: '', password: '', name: '', gender: 1, role: 1 }
      this.dialogVisible = true
    },
    edit(row) {
      this.dialogTitle = '编辑用户'
      this.form = { ...row }
      this.dialogVisible = true
    },
    async save() {
      if (!this.form.username || !this.form.password) {
        this.$message.warning('请填写用户名和密码')
        return
      }
      if (this.form.id) {
        await updateUser(this.form)
        this.$message.success('修改成功')
      } else {
        await addUser(this.form)
        this.$message.success('新增成功')
      }
      this.dialogVisible = false
      this.getList()
    },
    confirmDelete(row) {
      this.deleteUserId = row.id
      this.deleteUserName = row.name || row.username
      this.deleteDialogVisible = true
    },
    async deleteUser() {
      await deleteUser(this.deleteUserId)
      this.$message.success('删除成功')
      this.deleteDialogVisible = false
      this.getList()
    }
  }
}
</script>

