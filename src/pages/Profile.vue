<script setup lang="ts">
import { useProfile } from '@/ts/pages/profile'
import MainLayout from '@/components/layout/MainLayout.vue'

const {
  userInfo,
  editData,
  isEditing,
  isSaving,
  message,
  toggleEdit,
  handleSave
} = useProfile()
</script>

<template>
  <MainLayout>
    <div class="profile-container">
      <div class="profile-header">
        <h1>个人资料</h1>
        <p class="subtitle">管理您的个人信息</p>
      </div>

      <div class="profile-content">
        <div class="profile-sidebar">
          <div class="avatar-section">
            <img 
              :src="userInfo.avatar || '/images/default-avatar.jpg'" 
              :alt="userInfo.nickname"
              class="avatar"
            >
            <div class="avatar-overlay" v-if="isEditing">
              <span>更换头像</span>
            </div>
          </div>
          <div class="user-basic-info">
            <h2>{{ userInfo.nickname || userInfo.username }}</h2>
            <span class="user-role">{{ userInfo.role === 'USER' ? '普通用户' : '管理员' }}</span>
          </div>
        </div>

        <div class="profile-main">
          <div class="profile-section">
            <div class="section-header">
              <h3>基本信息</h3>
              <button 
                class="edit-btn"
                @click="toggleEdit"
              >
                <i class="icon-edit"></i>
                {{ isEditing ? '取消' : '编辑' }}
              </button>
            </div>

            <div class="info-grid">
              <div class="info-item">
                <label>用户名</label>
                <span class="info-value">{{ userInfo.username }}</span>
              </div>

              <div class="info-item">
                <label>昵称</label>
                <div class="info-value">
                  <input 
                    v-if="isEditing"
                    v-model="editData.nickname"
                    type="text"
                    class="edit-input"
                    placeholder="请输入昵称"
                  >
                  <span v-else>{{ userInfo.nickname || '-' }}</span>
                </div>
              </div>

              <div class="info-item">
                <label>邮箱</label>
                <div class="info-value">
                  <input 
                    v-if="isEditing"
                    v-model="editData.email"
                    type="email"
                    class="edit-input"
                    placeholder="请输入邮箱"
                  >
                  <span v-else>{{ userInfo.email || '-' }}</span>
                </div>
              </div>

              <div class="info-item">
                <label>手机号码</label>
                <div class="info-value">
                  <input 
                    v-if="isEditing"
                    v-model="editData.phone"
                    type="tel"
                    class="edit-input"
                    placeholder="请输入手机号码"
                  >
                  <span v-else>{{ userInfo.phone || '-' }}</span>
                </div>
              </div>

              <div class="info-item">
                <label>注册时间</label>
                <span class="info-value">{{ new Date(userInfo.createdTime).toLocaleString() }}</span>
              </div>
            </div>

            <div v-if="message" :class="['message', message.includes('成功') ? 'success' : 'error']">
              {{ message }}
            </div>

            <div v-if="isEditing" class="actions">
              <button 
                class="save-btn"
                @click="handleSave"
                :disabled="isSaving"
              >
                {{ isSaving ? '保存中...' : '保存修改' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.profile-header {
  margin-bottom: 40px;
  text-align: center;
}

.profile-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 8px;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.profile-content {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.profile-sidebar {
  background: #f8f9fa;
  padding: 40px 20px;
  text-align: center;
  border-right: 1px solid #eee;
}

.avatar-section {
  position: relative;
  width: 180px;
  height: 180px;
  margin: 0 auto 24px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
}

.avatar-section:hover .avatar-overlay {
  opacity: 1;
}

.user-basic-info {
  margin-bottom: 24px;
}

.user-basic-info h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 8px;
}

.user-role {
  display: inline-block;
  padding: 4px 12px;
  background: #e9ecef;
  border-radius: 20px;
  color: #666;
  font-size: 0.9rem;
}

.profile-main {
  padding: 40px;
}

.profile-section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #eee;
}

.section-header h3 {
  font-size: 1.3rem;
  color: #333;
  margin: 0;
}

.info-grid {
  display: grid;
  gap: 24px;
}

.info-item {
  display: grid;
  grid-template-columns: 120px 1fr;
  align-items: center;
}

.info-item label {
  color: #666;
  font-size: 0.95rem;
}

.info-value {
  color: #333;
}

.edit-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
  font-family: inherit;
  font-size: 14px;
}

.edit-input:focus {
  border-color: #4CAF50;
  outline: none;
}

.edit-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 80px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: #f0f0f0;
  color: #333;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
  line-height: 1.5;
}

.edit-btn:hover {
  background: #e0e0e0;
}

.edit-btn i {
  font-size: 16px;
}

.save-btn {
  width: 100%;
  padding: 12px;
  margin-top: 32px;
  border: none;
  border-radius: 6px;
  background: #4CAF50;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-btn:hover {
  background: #45a049;
}

.message {
  margin-top: 16px;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.message.success {
  background: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
}

.message.error {
  background: #fff2f0;
  color: #ff4d4f;
  border: 1px solid #ffccc7;
}

.save-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .profile-content {
    grid-template-columns: 1fr;
  }

  .profile-sidebar {
    border-right: none;
    border-bottom: 1px solid #eee;
    padding: 24px;
  }

  .avatar-section {
    width: 120px;
    height: 120px;
  }

  .profile-main {
    padding: 24px;
  }

  .info-item {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}

* {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style> 