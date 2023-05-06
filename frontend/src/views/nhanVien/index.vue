<template>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Nhân viên</title>

    <link href="../../assets/Style/style.css" rel="stylesheet" />
  </head>

  <body>
    <div class="container">
      <div class="d-flex mb-2 center">
        <span
          class="btn btn-success mr-1"
          @click="
            $router.push({
              name: 'trangchu',
            })
          "
        >
        Trang chủ
        </span>
        <router-link
          :to="{
            name: 'nhanVien-them',
          }"
        >
          <span class="btn btn-primary m-4">Thêm</span>
        </router-link>
      </div>
      <table class="table table-bordered table-condensed">
        <thead>
          <tr>
            <th>MSNV</th>
            <th>Tên</th>
            <th>Giới tính</th>
            <th>Địa chỉ</th>
            <th>SDT</th>
            <th>Chức vụ</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(nv, index) in this.nhanVien" :key="index">
            <td>{{ nv.manv }}</td>
            <td>{{ nv.ten }}</td>
            <td>{{ nv.gioitinh }}</td>
            <td>{{ nv.diachi }}</td>
            <td>{{ nv.sdt }}</td>
            <td>{{ nv.macv }}</td>
            <td>
              <span
                class="btn btn-warning m-1"
                @click="
                  $router.push({
                    name: 'nhanVien-sua',
                    params: { id: nv._id },
                  })
                "
              >
                Sửa
              </span>
              <span class="btn btn-danger m-1" @click="deleteNV(nv._id)"
                >Xóa</span
              >
            </td>
          </tr>
        </tbody>
      </table>
      <ul
        class="pagination"
        style="display: flex; justify-content: center; align-items: center"
      ></ul>
    </div>
  </body>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      nhanVien: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get("http://localhost:3000/api/qlnv/nhanvien").then((res) => {
        this.nhanVien = res.data;
      });
    },
    deleteNV(id) {
      axios
        .delete(`http://localhost:3000/api/qlnv/nhanvien/${id}`)
        .then(() => {
          window.location.href = "http://localhost:3001/nhanvien/";
        });
    },
  },
};
</script>
