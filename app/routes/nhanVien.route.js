const express = require("express");
const qlnv = require("../controllers/nhanVien.controller.js");
const qlcv = require("../controllers/chucVu.controller.js")

const router = express.Router();

router.route("/nhanvien")
    .get(qlnv.findAll)
    .post(qlnv.create)
    .delete(qlnv.deleteAll);

router.route("/nhanvien/:id")
    .get(qlnv.findOne)
    .put(qlnv.update)
    .delete(qlnv.delete);

router.route("/chucvu")
    .get(qlcv.findAll)
    .post(qlcv.create)
    .delete(qlcv.deleteAll);

router.route("/chucvu/:id")
    .put(qlcv.update)
    .delete(qlcv.delete);


module.exports = router;
