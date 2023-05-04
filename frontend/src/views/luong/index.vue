<template>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Lương</title>

    <link rel="stylesheet" href="../../assets/Style/style.css" />
  </head>

  &nbsp;
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
    
      </div>
      <table class="table table-bordered table-condensed">
        <thead>
          <tr>
            <th>MSNV</th>
            <th>Tên</th>
            <th>Giới tính</th>
            <th>Chức vụ</th>
            <th>Lương</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="nv in this.nhanVien">
            <td>{{ nv.manv }}</td>
            <td>{{ nv.ten }}</td>
            <td>{{ nv.gioitinh }}</td>
            <template v-for="cv in this.chucVu">
              <td v-if="cv.macv == nv.macv">{{ cv.chucvu }}</td>
            </template>
            <template v-for="cv in this.chucVu">
              <td v-if="cv.macv == nv.macv">{{ formatNumber(cv.hsluong*1490000)+' Vnd' }}</td>
            </template>
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
      chucVu: [],
      nhanVien: [],
    };
  },
  mounted() {
    this.getDataCV();
    this.getDataNV();
  },
  methods: {
    getDataCV() {
      axios.get("http://localhost:3000/api/qlnv/chucvu").then((res) => {
        this.chucVu = res.data;
        console.log(this.chucVu);
      });
    },
    getDataNV() {
      axios.get("http://localhost:3000/api/qlnv/nhanvien").then((res) => {
        this.nhanVien = res.data;
        console.log(this.nhanVien);
      });
    },
    formatNumber(number){
        return number.toLocaleString();
    }
  },
};
</script>
