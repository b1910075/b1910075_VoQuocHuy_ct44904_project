const { ObjectId } = require("mongodb");

class QlnvService {
    constructor(client) {
        this.nhanVien = client.db().collection("nhanvien");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConnactData(payload) {
        const nhanVien = {
            manv: payload.manv,
            ten: payload.ten,            
            gioitinh: payload.gioitinh,
            email: payload.email,
            diachi: payload.diachi,
            sdt: payload.sdt,
            macv: payload.macv
        };
        // Remove undefined fields
        Object.keys(nhanVien).forEach(
            (key) => nhanVien[key] === undefined && delete contact[key]
        );
        return nhanVien;
    }

    async create(payload) {
        const nhanVien = this.extractConnactData(payload);
        const result = await this.nhanVien.findOneAndUpdate(
            nhanVien,
            { $set: {} },
            { returnDocument: "after", upsert: true}
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.nhanVien.find(filter);
        return await cursor.toArray();
    }

    async findByManv(manv) {
        return await this.find({
            manv: { $regex: new RegExp(manv), $options: "i"},
        });
    }

    async findByName(ten) {
        return await this.find({
            ten: { $regex: new RegExp(ten), $options: "i"},
        });
    }

    async findById(id) {
        return await this.nhanVien.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        };
        const update = this.extractConnactData(payload);
        const result = await this.nhanVien.findOneAndUpdate(
            filter,
            { $set: update},
            {returnDocument: "After"}
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.nhanVien.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });
        return result.value;
    }


    async deleteAll() {
        const result = await this.nhanVien.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = QlnvService;