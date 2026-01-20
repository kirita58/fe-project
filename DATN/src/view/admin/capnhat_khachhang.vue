<template>
  <div class="update_page">
    <h3 class="title">CẬP NHẬT NHÂN VIÊN</h3>

    <div class="card">
      <form @submit.prevent="submit">
        <div class="row">

          <div class="mb-3">
            <label class="form-label">Họ và tên</label>
            <input class="form-control" v-model="kh.tenKhachHang" placeholder="Nhập họ và tên" />
          </div>

          <div class="mb-3">
            <label class="form-label">Tên tài khoản</label>
            <input class="form-control" v-model="kh.tenTaiKhoan" placeholder="Nhập tên tài khoản" />
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input class="form-control" type="email" v-model="kh.email" placeholder="example@email.com" />
          </div>

          <div class="mb-3">

            <div class="radio-group">
              <label class="form-label">Giới tính :</label>
              <div>
                <input type="radio" id="nam" :value="true" v-model="kh.gioiTinh" />
                <label for="nam">Nam</label>
              </div>
              <div>
                <input type="radio" id="nu" :value="false" v-model="kh.gioiTinh" />
                <label for="nu">Nữ</label>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Mật khẩu</label>
            <input class="form-control" type="password" v-model="kh.matKhau" placeholder="Nhập mật khẩu" />
          </div>

          <div class="mb-3">
            <label class="form-label">Ngày sinh</label>
            <input class="form-control" type="date" v-model="kh.ngaySinh" placeholder="Ngày sinh" />
          </div>

          <div class="mb-3">
            <label class="form-label">Số điện thoại</label>
            <input class="form-control" v-model="kh.soDienThoai" placeholder="Nhập số điện thoại" />
          </div>

        </div>
        <!-- ACTION -->
        <div class="text-end mt-4">
          <button type="submit" class="btn btn-primary me-2">Cập nhật</button>
          <button type="button" class="btn btn-danger" @click="cancel">Xóa</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { detailKhachHang, removeKhachHang, updateKhachHang } from "@/service/khachhang";

const router = useRouter();
const route = useRoute();
const id = route.params.id;

const kh = ref({
  tenKhachHang: "",
  tenTaiKhoan: "",
  gioiTinh: null,
  email: "",
  matKhau: "",
  ngaySinh: "",
  soDienThoai: ""
});

const loadKhachHang = async () => {
  try {
    const data = await detailKhachHang(id);
    if (data) {
      kh.value = {
        ...data,
        ngaySinh: data.ngaySinh?.substring(0, 10)
      };
    }
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết khách hàng:", error);
    alert("Không thể tải thông tin khách hàng!");
  }
};

/* SUBMIT CẬP NHẬT */
const submit = async () => {
  await updateKhachHang(id, kh.value);
  router.push("/khachhang");
};

const cancel = async () => {
  await removeKhachHang(id);
  router.push("/khachhang");
};

onMounted(() => {
  loadKhachHang();
});
</script>


<style scoped>
.update_page {
  margin: 20px 20px;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 6px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.col label {
  display: block;
  margin-top: 12px;
  font-weight: 500;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 4px;
}

.radio-group {
  display: flex;
  gap: 20px;
  margin-top: 6px;
}

.actions {
  margin-top: 20px;
}

.btn {
  padding: 8px 16px;
  margin-right: 10px;
}

.primary {
  background: #3b82f6;
  color: white;
  border: none;
}
</style>
