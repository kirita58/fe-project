<template>
  <div class="create_page">
    <h3 class="title">THÊM MỚI NHÂN VIÊN</h3>

    <div class="card">
      <form @submit.prevent="submit">
        <div class="row">

          <!-- CỘT TRÁI -->
          <div class="col-md-6">

            <div class="mb-3">
              <label class="form-label">Tên</label>
              <input class="form-control" v-model="nv.tenNhanVien" placeholder="Nhập tên nhân viên" />
            </div>

            <div class="mb-3">
              <label class="form-label">Tên tài khoản</label>
              <input class="form-control" v-model="nv.tenTaiKhoan" placeholder="Nhập tên tài khoản" />
            </div>

            <div class="mb-3">
              <label class="form-label">Ngày sinh</label>
              <input class="form-control" type="date" v-model="nv.ngaySinh" />
            </div>

            <div class="mb-3">
              <label class="form-label">Căn cước công dân</label>
              <input class="form-control" v-model="nv.cccd" placeholder="Nhập CCCD" />
            </div>

            <div class="mb-3">
              <label class="form-label">Email</label>
              <input class="form-control" type="email" v-model="nv.email" placeholder="example@email.com" />
            </div>

            <div class="mb-3">
              <label class="form-label">Mật khẩu</label>
              <input class="form-control" type="password" v-model="nv.matKhau" placeholder="Nhập mật khẩu" />
            </div>

            <div class="mb-3">
              <label class="form-label">Số điện thoại</label>
              <input class="form-control" v-model="nv.soDienThoai" placeholder="Nhập số điện thoại" />
            </div>
          </div>

          <!-- CỘT PHẢI -->
          <div class="col-md-6">

            <!-- <div class="mb-3">
              <label class="form-label">Ảnh đại diện</label>
              <input class="form-control" v-model="nv.anhNhanVien" placeholder="Nhập link ảnh hoặc tên file" />
            </div> -->

            <div class="mb-3">
              <label class="form-label">Thành phố</label>
              <select class="form-control" v-model="nv.thanhPho">
                <option value="">Chọn thành phố</option>
                <option v-for="tp in thanhphoOptions" :key="tp" :value="tp">{{ tp }}</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Quận / Huyện</label>
              <select class="form-control" v-model="nv.quan">
                <option value="">Chọn quận/huyện</option>
                <option v-for="q in quanOptions" :key="q" :value="q">{{ q }}</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Xã / Phường</label>
              <select class="form-control" v-model="nv.phuong">
                <option value="">Chọn xã/phường</option>
                <option v-for="p in phuongOptions" :key="p" :value="p">{{ p }}</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Địa chỉ cụ thể</label>
              <input class="form-control" v-model="nv.diaChiCuThe" placeholder="Nhập địa chỉ cụ thể" />
            </div>
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
import { addNhanVien } from "@/service/nhanvien";
import { getAllQuyenHan } from "@/service/quyenhan";
import { onMounted, ref } from "vue";

const listQuyenHan = ref([]);

const nv = ref({
  idQuyenHan: null,
  tenNhanVien: "",
  tenTaiKhoan: "",
  matKhau: "",
  email: "",
  soDienThoai: "",
  anhNhanVien: "",
  ngaySinh: "",
  ghiChu: "",
  thanhPho: "",
  quan: "",
  phuong: "",
  diaChiCuThe: "",
  cccd: "",
  trangThai: true
});

const thanhphoOptions = ["Hà Nội", "TP.HCM", "Đà Nẵng", "Hải Phòng", "Cần Thơ"];

const phuongOptions = ["Phường Xuân Phương", "Phường Mỹ Đình 1", "Phường Mỹ Đình 2", "Phường Mễ Trì", "Phường Trung Văn", "Phường Cầu Diễn", "Phường Phú Đô", "Phường Đại Mỗ", "Phường Tây Mỗ", "Phường Minh Khai", "Phường Trung Hòa"
];

const quanOptions = [
  "Quận Nam Từ Liêm", "Quận Bắc Từ Liêm", "Quận Cầu Giấy", "Quận Thanh Xuân", "Quận Hoàng Mai", "Quận Đống Đa", "Quận Hai Bà Trưng", "Quận Tây Hồ", "Quận Long Biên", "Quận Hoàn Kiếm", "Quận Ba Đình", "Quận Hà Đông", "Quận Sơn Tây"
];

const submit = async () => {
  await addNhanVien(nv.value);
  router.push('/nhanvien');
};

const cancel = () => {
  router.push('/nhanvien');
};

const getAllQH = async () => {
  try {
    listQuyenHan.value = await getAllQuyenHan();
  } catch (error) {
    console.log("Lỗi lấy danh sách quyền hạn:", error);
  }
};

onMounted(() => {
  getAllQH();
});
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
