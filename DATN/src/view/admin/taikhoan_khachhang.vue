<template>
  <div class="taikhoan-khachhang" v-if="!isPage">
    <div class="toolbar">
      <div class="toolbar-left">
        <input v-model="keyword" type="text" placeholder="Tìm kiếm" class="search-input" />
        <button class="btn btn-search" @click="searchKH">Tìm kiếm</button>
        <button class="btn btn-reset" @click="reset">Làm mới</button>
      </div>

      <div class="toolbar-right">
        <div class="filter-group">
          <label>Trạng thái:</label>
          <select v-model="status" class="form-select rounded-3 no-border-select">
            <option value="">Tất cả</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Ngừng hoạt động</option>
          </select>
        </div>

        <button class="btn btn-newaccount" @click="themkh">
          <i class="fa-solid fa-plus"></i> Tạo Tài Khoản
        </button>
      </div>
    </div>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>STT</th>
            <th>Mã khách hàng</th>
            <th>Tên khách hàng</th>
            <th>Tên tài khoản</th>
            <th>Số điện thoại</th>
            <th>Email</th>
            <th>Ngày tạo</th>
            <th class="text-center">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item, index) in khachhangList" :key="item.id">
            <td class="text-bold text-gray">{{ index + 1 }}</td>

            <td class="text-bold text-gray">
              {{ item.maKhachHang }}
            </td>

            <td class="text-bold text-gray">
              {{ item.tenKhachHang }}
            </td>

            <td class="text-bold text-gray">
              {{ item.tenTaiKhoan }}
            </td>

            <td class="text-gray">
              {{ item.soDienThoai }}
            </td>

            <td class="text-gray">
              {{ item.email }}
            </td>



            <td>
              <div class="date">
                <span class="sub-date">
                  {{ formatDate(item.ngayTao) }}
                </span>
              </div>
            </td>
            <td class="text-center">
              <button class="btn-icon view" @click="updatedkh(item.id)"><i class="fa-regular fa-eye"></i></button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>

    <div class="pagination-container">
      <button class="page-btn disabled">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button class="page-btn active">1</button>
      <button class="page-btn">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </div>

  <router-view />
</template>

<script setup>
import { getAllKhachHang, searchKhachHang } from '@/service/khachhang';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const themkh = () => {
  router.push({ name: 'kh-add' });
};

const updatedkh = (id) => {
  router.push({ name: 'kh-update', params: { id } });
};

const isPage = computed(() =>
  route.name === 'kh-add' || route.name === 'kh-update'
);

const keyword = ref('');
const status = ref('');

const khachhangList = ref([])

const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('vi-VN');
};

const getAllKH = async () => {
  try {
    khachhangList.value = await getAllKhachHang();
  } catch (error) {
    console.log("Lỗi lấy danh sách khách hàng:", error);
  }
};

// const searchNV = async () => {
//   try {
//     nhanVienList.value = await searchNhanVien(keyword.value);
//   } catch (e) {
//     console.log("Lỗi tìm kiếm:", e);
//   }
// };

const searchKH = async () => {
  try {
    khachhangList.value = await searchKhachHang(keyword.value);

  } catch (e) {
    console.log("Lỗi tìm kiếm:", e);
  }
};

const reset = () => {
  keyword.value = '';
  status.value = '';
};

watch(
  () => route.path,
  (newPath) => {
    if (!newPath.includes('/khachhang/add') && !newPath.includes('/khachhang/update')) {
      getAllKH();
    }
  }
);

onMounted(() => {
  getAllKH();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.taikhoan-khachhang {
  font-family: 'Inter', sans-serif;
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  border: 1px solid #E5E7EB;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  margin: 20px;
}

.text-bold {
  font-weight: 600;
}

.text-gray {
  color: #6B7280;
}

.text-center {
  text-align: center;
}

.w-50 {
  width: 50px;
}

/* ===== TOOLBAR ===== */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 24px;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
}

.toolbar-left {
  gap: 10px;
}

.toolbar-right {
  gap: 24px;
}

.search-input {
  height: 40px;
  padding: 0 16px;
  border-radius: 6px;
  border: 1px solid #E5E7EB;
  outline: none;
  min-width: 200px;
  color: #374151;
}

.btn {
  height: 40px;
  padding: 0 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: opacity 0.2s;
}

.btn-icon {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: #94a3b8;
  transition: 0.2s;
}

.btn-icon:hover {
  background: #f1f5f9;
  color: #333;
}

.btn-icon.view:hover {
  color: #3b82f6;
}

.btn-icon.edit:hover {
  color: #f59e0b;
}

.btn:hover {
  opacity: 0.9;
}

.btn-search {
  background: #3B82F6;
  color: #fff;
}

.btn-reset {
  background: #FF4500;
  color: #fff;
}

.btn-newaccount {
  background: #3B82F6;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4B5563;
  font-weight: 500;
}

/* ===== TABLE ===== */
.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

th {
  padding: 16px;
  background: #F9FAFB;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  color: #374151;
  border-bottom: 1px solid #E5E7EB;
  white-space: nowrap;
}

th:first-child {
  border-top-left-radius: 6px;
}

th:last-child {
  border-top-right-radius: 6px;
}

td {
  padding: 16px;
  border-bottom: 1px solid #F3F4F6;
  font-size: 14px;
  vertical-align: middle;
}

tbody tr:hover {
  background: #F9FAFB;
}

/* DATE & STATUS */
.date {
  display: flex;
  flex-direction: column;
  line-height: 1.4;
}

.sub-date {
  font-size: 13px;
  color: #9CA3AF;
}

.status {
  padding: 6px 0;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  display: inline-block;
  width: 130px;
  text-align: center;
}

.status.active {
  background: #22C55E;
  color: #fff;
}

.status.inactive {
  background: #EF4444;
  color: #fff;
}

.icon-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  color: #6B7280;
  transition: color 0.2s;
}

.icon-btn:hover {
  color: #3B82F6;
}

/* ===== PAGINATION ===== */
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
}

.page-btn {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #E5E7EB;
  background: #fff;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  font-weight: 500;
}

.page-btn:hover:not(.disabled) {
  background: #F3F4F6;
  border-color: #D1D5DB;
}

.page-btn.active {
  background: #111827;
  color: #fff;
  border-color: #111827;
}

.page-btn.disabled {
  color: #D1D5DB;
  cursor: not-allowed;
  background: #F9FAFB;
}

.no-border-select {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  cursor: pointer;
}
</style>
