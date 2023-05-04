<template>
  <!DOCTYPE html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Edit Nhân viên</title>
  </head>
  <body>
    <div class="container">
      <h1 class="text-center text-danger" data-wow-duration="1s">
        Sửa nhân viên
      </h1>

      <form method="POST" action="">
        <div class="row m-2">
          <label class="col-md-2" for="msnv">MSNV:</label>
          <input
            type="text"
            class="col-md-10"
            id="manv"
            v-bind:value="this.nhanVien.manv"
          />
        </div>

        <div class="row m-2">
          <label class="col-md-2" for="hoten">Tên:</label>
          <input
            type="text"
            id="ten"
            class="col-md-10"
            name="hoten"
            v-bind:value="this.nhanVien.ten"
          />
        </div>

        <template v-if="this.nhanVien.gioitinh == 'Nam'">
          <div class="row m-2">
            <p class="col-2">Giới tính:</p>
            <div class="col-1">
              <input
                type="radio"
                id="nam"
                name="gioitinh"
                value="Nam"
                checked
              />
              <label for="nam">Nam</label>
            </div>
            <div class="col-1">
              <input type="radio" id="nu" name="gioitinh" value="Nữ" />
              <label for="nu">Nữ</label>
            </div>
          </div>
        </template>

        <template v-if="this.nhanVien.gioitinh == 'Nữ'">
          <div class="row m-2">
            <p class="col-2">Giới tính:</p>
            <div class="col-1">
              <input
                type="radio"
                id="nam"
                name="gioitinh"
                value="Nam"
              />
              <label for="nam">Nam</label>
            </div>
            <div class="col-1">
              <input type="radio" id="nu" name="gioitinh" value="Nữ" checked/>
              <label for="nu">Nữ</label>
            </div>
          </div>
        </template>



        <div class="row m-2">
          <label class="col-md-2" for="diachi">Địa chỉ:</label>
          <input
            type="text"
            id="diachi"
            class="col-md-10"
            name="diachi"
            v-bind:value="this.nhanVien.diachi"
          />
        </div>
        <div class="row m-2">
          <label class="col-md-2" for="diaChi">Email:</label>
          <input
            type="text"
            id="email"
            class="col-md-10"
            name="email"
            v-bind:value="this.nhanVien.email"
          />
        </div>
        <div class="row m-2">
          <label class="col-md-2" for="sdt">SDT:</label>
          <input
            type="text"
            id="sdt"
            class="col-md-10"
            name="sdt"
            v-bind:value="this.nhanVien.sdt"
          />
        </div>
        <div class="row m-2">
          <label for="maCV" class="col-2">Chức vụ:</label>
          <select class="col-2" id="macv">
            <option
              v-for="(cv, index) in this.chucVu"
              :key="index"
              v-bind:value="cv.macv"
            >
              {{ cv.chucvu }}
            </option>
          </select>
        </div>

        <div class="btn btn-primary m-2 float-end" @click="updateNV">
          Xác nhận
        </div>
      </form>
    </div>
  </body>
</template>



<script>
import axios from "axios";
export default {
  data() {
    return {
      nhanVien: [],
      chucVu: [],
    };
  },
  props: {
    id: { type: String, required: true },
  },
  mounted() {
    this.getData(), this.getDataCV();
  },
  methods: {
    getData() {
      axios
        .get(`http://localhost:3000/api/qlnv/nhanvien/${this.id}`)
        .then((res) => {
          this.nhanVien = res.data;
          console.log(this.nhanVien);
        });
    },
    getDataCV() {
      axios.get("http://localhost:3000/api/qlnv/chucvu").then((res) => {
        this.chucVu = res.data;
        console.log(this.chucVu);
      });
    },
    updateNV() {
      var gioiTinh = "Nam";
      if(document.getElementById('nu').checked == true){
          gioiTinh = "Nữ"
      }
      let updateNhanVien = {
        manv: document.getElementById('manv').value,
        ten: document.getElementById('ten').value,
        gioitinh: gioiTinh,
        diachi: document.getElementById('diachi').value,
        email: document.getElementById('email').value,
        sdt: document.getElementById('sdt').value,
        macv: document.getElementById('macv').value,



      };
      console.log(updateNhanVien);
      axios
        .put(`http://localhost:3000/api/qlnv/nhanvien/${this.id}`, updateNhanVien)
        .then((response) => {
          console.log(response);
          window.location.href = 'http://localhost:3001/nhanvien';
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
