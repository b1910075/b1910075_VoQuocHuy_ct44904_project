const ApiError = require("../api-error");
const QlcvService = require("../services/chucVu.service");
const MongoDB = require("../utils/mongodb.util");


exports.create = async (req, res, next) => {
    if (!req.body?.macv) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const qlcvService = new QlcvService(MongoDB.client);
        const document = await qlcvService.create(req.body);
        return res.send(document);
    } catch (error){
        return next (
            new ApiError(500,"An error occured while creating")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const qlcvService = new QlcvService(MongoDB.client);

        documents = await qlcvService.find({});

    } catch (error) {
        return next(
            new ApiError(500, "An error occured while retrieving")
        );
    }

    return res.send(documents);
};


exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update cannot be empty"));
    }

    try {
        const qlcvService = new QlcvService(MongoDB.client);
        const document = await qlcvService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Not found"));
        }
        return res.send({message: "Update successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Error updating role with id = ${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const qlcvService = new QlcvService(MongoDB.client);
        const document = await qlcvService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Role not found"));
        }
        return res.send({ message: "Role was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete role with id = ${req.params.id}`
            )
        );
    }
};



//Delete all contacts of a user from database
exports.deleteAll = async (req, res, next) => {
    try {
        const qlcvService = new QlcvService(MongoDB.client);
        const deletedCount = await qlcvService.deleteAll();
        return res.send({
            message: `${deletedCount} roles were deleted successfully`,
        });
    } catch (error){
        return next(
            new ApiError(500, "An error occurred while removing all roles")
        );
    }
}


