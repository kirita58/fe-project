<template>
  <div class="create_page">
    <h3 class="title">THÊM KHÁCH HÀNG MỚI</h3>

    <div class="card">
      <h4 class="form-title text-center">Thông tin cá nhân</h4>
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
          <button type="submit" class="btn btn-primary me-2" @click="submit">Thêm</button>
          <button type="button" class="btn btn-danger" @click="cancel">Hủy</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import router from "@/router/router";
import { addKhachHang } from "@/service/khachhang";
import { ref } from "vue";

const kh = ref({
  tenKhachHang: "",
  tenTaiKhoan: "",
  gioiTinh: null,
  email: "",
  matKhau: "",
  ngaySinh: "",
  soDienThoai: ""
});

const submit = async () => {
  await addKhachHang(kh.value);
  router.push('/khachhang');
};

const cancel = () => {
  router.push('/khachhang');
};

</script>

<style scoped>
.create_page {
  margin: 20px 20px;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 6px;
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

.radio-group div {
  display: flex;
  align-items: center;
  gap: 8px;
}

.radio-group input[type="radio"] {
  width: auto;
  padding: 0;
  margin: 0;
}

.radio-group label {
  margin: 0;
  font-weight: normal;
  cursor: pointer;
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
