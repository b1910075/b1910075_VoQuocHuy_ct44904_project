<template>
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Nhân viên</title>
  </head>

  <body>

    &nbsp;

    <div class="container text-center">
        <div class="row justify-content-center">
            <div class="col-auto" >
                <div class="card"  style="overflow: auto;">
                    <img src="../assets/img/luong.png" class="card-img-top rounded mx-auto d-block" alt="Luong">

                    <div class="card-body">
                        <h5 class="card-title">Quản lí lương</h5>
                        <router-link :to="{name: 'luong-index'}">
                          <a href="#" class="btn btn-primary">Xem thêm</a>
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="col-auto">
                <div class="card"  style="overflow: auto;">
                    <img src="../assets/img/nhanvien.png" style="" class="card-img-top rounded mx-auto d-block" alt="Nhan vien">

                    <div class="card-body">
                        <h5 class="card-title">Quản lí nhân viên</h5>
                        <router-link :to="{name: 'nhanVien-index'}">
                          <a href="#" class="btn btn-primary">Xem thêm</a>
                        </router-link>
                    </div>
                </div>
            </div>

            <div class="col-auto">
                <div class="card"  style="overflow: auto;">
                    <img src="../assets/img/role.png" style="" class="card-img-top rounded mx-auto d-block" alt="Nhan vien">

                    <div class="card-body">
                        <h5 class="card-title">Quản lí chức vụ</h5>
                        <router-link :to="{name: 'chucVu-index'}">
                          <a href="#" class="btn btn-primary">Xem thêm</a>
                        </router-link>
                    </div>
                </div>
            </div>

        </div>
    </div>    
</body>
</template>
