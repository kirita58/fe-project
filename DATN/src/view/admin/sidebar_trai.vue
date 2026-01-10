<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="logo">
          <img :src="logo" alt="Logo" />
        </div>

        <ul class="menu">
        <li class="menu-item">
          <RouterLink to="/admin/" class="menu-link">
            Trang chủ
          </RouterLink>
        </li>

        <li class="menu-item">
          <RouterLink to="/admin/" class="menu-link">
            Thống kê
          </RouterLink>
        </li>

        <li class="menu-item">
          <RouterLink to="/admin/" class="menu-link">
            Bán hàng
          </RouterLink>
        </li>

        <li class="menu-item">
          <RouterLink to="/admin/" class="menu-link">
            Quản lý hóa đơn
          </RouterLink>
        </li>

        <li class="menu-item">
          <RouterLink to="/admin/" class="menu-link">
            Quản lý giảm giá
          </RouterLink>
        </li>

        <li class="menu-item">
          <RouterLink to="/admin/" class="menu-link">
            Quản lý sản phẩm
          </RouterLink>
        </li>

        <li class="menu-item">
          <RouterLink to="/admin/" class="menu-link">
            Danh sách thuộc tính
          </RouterLink>
        </li>

        <li class="menu-item">
          <RouterLink to="/admin/" class="menu-link">
            Tài khoản
          </RouterLink>
        </li>
      </ul>
    </aside>

    <main class="content">
      <RouterView />
    </main>
  </div>
</template>


<script setup>
import logo from '@/images/Logo_New.png'
</script>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
  background: #f5f6fa;
}

.sidebar {
  width: 240px;
  background: #ffffff;
  border-right: 1px solid #eee;
  padding: 20px;
}

.logo {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e5e7eb; /* gạch xám nhạt */
}

.logo img {
  width: 120px;
  height: 120px;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu-item {
  margin-bottom: 6px;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  color: black;
  text-decoration: none;
  font-size: 20px;
  transition: 0.2s;
}

.menu-link:hover {
  background: #f0f3ff;
  color: #3f51b5;
}

/* .router-link-active {
  background: #e8ebff;
  color: #3f51b5;
  font-weight: 600;
} */

.content {
  flex: 1;
  padding: 24px;
}
</style>
