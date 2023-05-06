<template>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Nhân viên</title>
</head>

<body>
<div class="container">
    <h1 class="text-center text-danger" data-wow-duration="1s">Add chức vụ</h1>

    <form method="" action="">
        <div class="row m-2">
            <label class="col-md-2" for="macv">Mã chức vụ:</label>
            <input type="text" id="macv" class="col-md-10" v-model="ChucVu.macv">
        </div>

        <div class="row m-2">
            <label class="col-md-2" for="chucvu">Tên chức vụ:</label>
            <input type="text" id="chucvu" class="col-md-10" v-model="ChucVu.chucvu">
        </div>

        <div class="row m-2">
            <label class="col-md-2" for="hsluong">Hệ số lương:</label>
            <input type="text" id="hsluong" class="col-md-10" v-model="ChucVu.hsluong">
        </div>
        <div class="btn btn-primary m-2 float-end" @click="addCV">Submit</div>
    </form>
</div>
</body>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            ChucVu: {
                macv: '',
                chucvu: '',
                hsluong: ''
            }
        }
    },
    methods: {
        addCV() {
            let newChucVu = {
                "macv": this.ChucVu.macv,
                "chucvu": this.ChucVu.chucvu,
                "hsluong": this.ChucVu.hsluong
            }
            console.log(newChucVu);
            axios
            .post('http://localhost:3000/api/qlnv/chucvu/', newChucVu)
            .then((response) => {
                console.log(response);
                window.location.href = 'http://localhost:3001/chucvu/';
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>