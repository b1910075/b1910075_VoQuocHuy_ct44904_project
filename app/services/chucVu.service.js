const { ObjectId } = require("mongodb");

class QlcvService {
    constructor(client) {
        this.chucVu = client.db().collection("chucvu");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractChucvuData(payload) {
        const chucVu = {
            macv: payload.macv,
            chucvu: payload.chucvu,
            hsluong: payload.hsluong
        };
        // Remove undefined fields
        Object.keys(chucVu).forEach(
            (key) => chucVu[key] === undefined && delete contact[key]
        );
        return chucVu;
    }

    async create(payload) {
        const chucVu = this.extractChucvuData(payload);
        const result = await this.chucVu.findOneAndUpdate(
            chucVu,
            { $set: {} },
            { returnDocument: "after", upsert: true}
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.chucVu.find(filter);
        return await cursor.toArray();
    }

    async findByName(chucvu) {
        return await this.find({
            chucvu: { $regex: new RegExp(chucvu), $options: "i"},
        });
    }

    async findById(id) {
        return await this.chucVu.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        };
        const update = this.extractChucvuData(payload);
        const result = await this.chucVu.findOneAndUpdate(
            filter,
            { $set: update},
            {returnDocument: "After"}
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.chucVu.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });
        return result.value;
    }


    async deleteAll() {
        const result = await this.chucVu.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = QlcvService;