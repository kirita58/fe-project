<template>
  <div class="update_page">
    <h3 class="title">CẬP NHẬT NHÂN VIÊN</h3>

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

            <div class="mb-3">
              <label class="form-label">Ảnh đại diện</label>
              <input class="form-control" v-model="nv.anhNhanVien" placeholder="Nhập link ảnh hoặc tên file" />
            </div>

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

        <div class="mb-3">
          <label class="form-label">Quyền hạn</label>
          <select class="form-control" v-model.number="nv.idQuyenHan">
            <option value="">Chọn quyền hạn</option>
            <option v-for="qh in listQuyenHan" :key="qh.id" :value="qh.id">
              {{ qh.tenQuyenHan }}
            </option>
          </select>
        </div>

        <div class="d-flex justify-content-between align-items-center mt-4">
          <button type="button" class="btn" :class="nv.trangThai ? 'btn-warning' : 'btn-success'" @click="toggleStatus">
            {{ nv.trangThai ? 'Hủy hoạt động' : 'Hoạt động' }}
          </button>

          <div>
            <button type="submit" class="btn btn-primary me-2">Cập nhật</button>
            <button type="button" class="btn btn-danger" @click="cancel">Xóa</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { detailNhanVien, removeNhanVien, updateNhanVien } from "@/service/nhanvien";
import { getAllQuyenHan } from "@/service/quyenhan";

const router = useRouter();
const route = useRoute();
const id = route.params.id;

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
  cccd: ""
});

const thanhphoOptions = ["Hà Nội", "TP.HCM", "Đà Nẵng", "Hải Phòng", "Cần Thơ"];

const phuongOptions = ["Phường Xuân Phương", "Phường Mỹ Đình 1", "Phường Mỹ Đình 2", "Phường Mễ Trì", "Phường Trung Văn", "Phường Cầu Diễn", "Phường Phú Đô", "Phường Đại Mỗ", "Phường Tây Mỗ", "Phường Minh Khai", "Phường Trung Hòa"
];

const quanOptions = [
  "Quận Nam Từ Liêm", "Quận Bắc Từ Liêm", "Quận Cầu Giấy", "Quận Thanh Xuân", "Quận Hoàng Mai", "Quận Đống Đa", "Quận Hai Bà Trưng", "Quận Tây Hồ", "Quận Long Biên", "Quận Hoàn Kiếm", "Quận Ba Đình", "Quận Hà Đông", "Quận Sơn Tây"
];

/* LẤY DANH SÁCH QUYỀN HẠN */
const getAllQH = async () => {
  listQuyenHan.value = await getAllQuyenHan();
};

/* LẤY THÔNG TIN NHÂN VIÊN THEO ID */
const loadNhanVien = async () => {
  try {
    const data = await detailNhanVien(id);
    if (data) {
      nv.value = {
        ...data,
        ngaySinh: data.ngaySinh?.substring(0, 10)
      };
    }
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết nhân viên:", error);
    alert("Không thể tải thông tin nhân viên!");
  }
};

const toggleStatus = async () => {
  try {
    nv.value.trangThai = !nv.value.trangThai;
    await updateNhanVien(id, nv.value);

    alert(
      nv.value.trangThai === true
        ? "Đã kích hoạt nhân viên!"
        : "Đã hủy kích hoạt nhân viên!"
    );
  } catch (e) {
    console.error(e);
    alert("Cập nhật trạng thái thất bại!");
  }
};



/* SUBMIT CẬP NHẬT */
const submit = async () => {
  await updateNhanVien(id, nv.value);
  router.push("/nhanvien");
};

const cancel = async () => {
  await removeNhanVien(id);
  router.push("/nhanvien");
};

onMounted(() => {
  getAllQH();
  loadNhanVien();
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
