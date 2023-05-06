<template>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Chức vụ</title>

    <link rel="stylesheet" href="../../assets/Style/style.css" />
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
            name: 'chucVu-them',
          }"
        >
          <span class="btn btn-primary m-4">Thêm</span>
        </router-link>
      </div>
      <table class="table table-bordered table-condensed">
        <thead>
          <tr>
            <th>Mã chức vụ</th>
            <th>Tên chức vụ</th>
            <th>Hệ số lương</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cv, index) in this.chucVu">
            <td>{{ cv.macv }}</td>
            <td>{{ cv.chucvu }}</td>
            <td>{{ cv.hsluong }}</td>
            <td>
              <span class="btn btn-danger m-1" @click="deleteNV(cv._id)"
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
      chucVu: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get("http://localhost:3000/api/qlnv/chucvu").then((res) => {
        this.chucVu = res.data;
        console.log(this.chucVu);
      });
    },
    deleteNV(id) {
      axios
        .delete(`http://localhost:3000/api/qlnv/chucvu/${id}`)
        .then(() => {
          window.location.href = "http://localhost:3001/chucvu";
        });
    },
  },
};
</script>
