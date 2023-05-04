<template>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Nhân viên</title>
  </head>

  <body>
    <div class="container">
      <h1 class="text-center text-danger" data-wow-duration="1s">
        Add nhân viên
      </h1>

      <form method="POST" action="">
        <div class="row m-2">
          <label class="col-md-2" for="manv">MSNV:</label>
          <input type="text" class="col-md-10" v-model="NhanVien.manv" />
        </div>
        
        <div class="row m-2">
          <label class="col-md-2" for="ten">Tên:</label>
          <input type="text" class="col-md-10" v-model="NhanVien.ten" />
        </div>

        <div class="row m-2">
          <label class="col-md-2" for="email">Email:</label>
          <input type="text" class="col-md-10" v-model="NhanVien.email" />
        </div>

        <div class="row m-2">
          <p class="col-2">Giới tính:</p>
          <div class="col-1">
            <input type="radio"/>
            <label for="nam">Nam</label>
          </div>
          <div class="col-1">
            <input type="radio" id="nu"/>
            <label for="nu">Nữ</label>
          </div>
        </div>

        <div class="row m-2">
          <label class="col-md-2" for="diachi">Nơi sinh:</label>
          <input
            type="text"
            class="col-md-10"
            name="noiSinh"
            v-model="NhanVien.diachi"
          />
        </div>

        <div class="row m-2">
          <label class="col-md-2" for="sdt">SDT:</label>
          <input type="text" class="col-md-10" v-model="NhanVien.sdt" />
        </div>

        <div class="row m-2">
          <label for="chucvu" class="col-2">Chức vụ:</label>
          <select class="col-2" v-model="NhanVien.macv">
            <option
              v-for="(cv, index) in this.chucVu"
              :key="index"
              v-bind:value="cv.macv"
            >
              {{ cv.chucvu }}
            </option>
          </select>
        </div>

        <div class="btn btn-primary m-2 float-end"  @click="addNV">Xác nhận</div>
      </form>
    </div>
  </body>
</template>

<script>
import axios from "axios";
export default {
  name: 'themNV',

  data() {
    return {
      chucVu: [],

      NhanVien: {

        manv: "",
        ten: "",            
        gioitinh: "",
        email: "",
        diachi: "",
        sdt: "",
        macv: ""    
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios.get("http://localhost:3000/api/qlnv/chucvu").then((res) => {
        this.chucVu = res.data;
      });
    },
    addNV() {
      var gioiTinh = "Nam";
      if(document.getElementById('nu').checked == true){
          gioiTinh = "Nữ"
      }
      let newNhanVien = {

        "manv": this.NhanVien.manv,
        "ten": this.NhanVien.ten,            
        "gioitinh": gioiTinh,
        "email": this.NhanVien.email,
        "diachi": this.NhanVien.diachi,
        "sdt": this.NhanVien.sdt,
        "macv": this.NhanVien.macv
      }
      console.log(newNhanVien);
      axios
        .post("http://localhost:3000/api/qlnv/nhanvien", newNhanVien)
        .then((response) => {
          console.log(response);
          window.location.href = 'http://localhost:3001/nhanvien/';
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
