<template>
  <nav class="container navbar rounded justify-content-center" style="background-color: antiquewhite;">
    <div class="container-fluid">
      <h1 class="navbar-brand" href="#">QUẢN LÍ NHÂN VIÊN</h1>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
       aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">

          <router-link :to="{name: 'trangchu'}">
            <b class="nav-link active text-decoration-none" >Trang chủ</b>
          </router-link>

          <router-link :to="{name: 'nhanVien-index'}">
            <a class="nav-link" >Nhân viên</a>
          </router-link>

          <router-link :to="{name: 'chucVu-index'}">
            <a class="nav-link">Chức vụ</a>
          </router-link>

          <router-link :to="{name: 'luong-index'}">
            <a class="nav-link" >Lương</a>
          </router-link>

        </div>
      </div>
    </div>
  </nav>

  <div id="app">
    <router-view></router-view>
  </div>
</template>


