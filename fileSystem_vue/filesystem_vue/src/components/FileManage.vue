<template>
  <div class="card">
    <el-card shadow="hover">
      <div slot="header">
        <span class="card-title">文件管理</span>
      </div>

      <el-upload :auto-upload="false" ref="upload" :on-change="handleFileChange" class="upload-box">
        <el-button slot="trigger" type="primary" icon="el-icon-upload">选择文件</el-button>
        <el-button type="success" icon="el-icon-check" @click="upload">上传</el-button>
      </el-upload>

      <el-table :data="fileList" border stripe>
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="filename" label="文件名" align="center" />
        <el-table-column prop="operatorName" label="上传者" align="center" />
        <el-table-column prop="uploadTime" label="上传时间" align="center" />
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="download(scope.row.id)">下载</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :page-size="query.pageSize"
          @current-change="changePage"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { getFileList, uploadFile, downloadFile } from '@/api/file'

export default {
  data() {
    return {
      query: { page: 1, pageSize: 10 },
      fileList: [],
      total: 0,
      selectedFile: null
    }
  },
  created() { this.loadFiles() },
  methods: {
    async loadFiles() {
      const res = await getFileList(this.query)
      this.fileList = res.data.rows
      this.total = res.data.total
    },
    handleFileChange(file) {
      this.selectedFile = file.raw
    },
    async upload() {
      if (!this.selectedFile) return this.$message.warning('请选择文件')
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      await uploadFile(formData)
      this.$message.success('上传成功')
      this.loadFiles()
    },
    async download(id) {
      const formData = new FormData()
      formData.append('id', id)
      const res = await downloadFile(id)
      window.open(res.data)
    },
    changePage(page) {
      this.query.page = page
      this.loadFiles()
    }
  }
}
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 8px;
}
.card-title {
  font-size: 16px;
  font-weight: 600;
}
.upload-box {
  margin-bottom: 15px;
}
.pagination {
  margin-top: 10px;
  text-align: right;
}
</style>
