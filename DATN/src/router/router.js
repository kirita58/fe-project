import Sidebar_trai from '@/layouts/sidebar_trai.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/khachhang',
    },
    {
      path: '/',
      component: Sidebar_trai,
      children: [
        // {
        //   path: 'tongquan',
        //   name: 'tongquan',
        //   component: TongQuan,
        // },
        // {
        //   path: 'sanpham',
        //   name: 'sanpham',
        //   component: SanPham,
        // },
        // {
        //   path: 'hoadon',
        //   name: 'hoadon',
        //   component: HoaDon,
        // },
        // {
        //   path: 'dotgiamgia',
        //   name: 'dotgiamgia',
        //   component: DotGiamGia,
        // },
        // {
        //   path: 'phieugiamgia',
        //   name: 'phieugiamgia',
        //   component: PhieuGiamGia,
        // },
        {
          path: 'nhanvien',
          name: 'nhanvien',
          component: () => import('@/view/admin/taikhoan_nhanvien.vue'),
          children: [
            {
              path: 'add',
              name: 'nv-add',
              component: () => import('@/view/admin/them_nhanvien.vue'),
            },
            {
              path: 'nhanvien/update/:id',
              name: 'nv-update',
              component: () => import('@/view/admin/capnhat_nhanvien.vue'),
            }
          ],
        },
        {
          path: 'khachhang',
          name: 'khachhang',
          component: () => import('@/view/admin/taikhoan_khachhang.vue'),
          children: [
            {
              path: 'add',
              name: 'kh-add',
              component: () => import('@/view/admin/them_khachhang.vue'),
            },
            {
              path: 'khachhang/update/:id',
              name: 'kh-update',
              component: () => import('@/view/admin/capnhat_khachhang.vue'),
            }
          ],
        }
      ],
    },
  ],
})

export default router
