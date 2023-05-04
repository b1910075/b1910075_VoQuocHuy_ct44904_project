const ApiError = require("../api-error");
const QlnvService = require("../services/nhanVien.service");
const MongoDB = require("../utils/mongodb.util");


//Create and Save a new Contact
exports.create = async (req, res, next) => {
    if (!req.body?.ten) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const qlnvService = new QlnvService(MongoDB.client);
        const document = await qlnvService.create(req.body);
        return res.send(document);
    } catch (error){
        return next (
            new ApiError(500,"An error occured while creating the contact")
        );
    }
};

// Retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const qlnvService = new QlnvService(MongoDB.client);
        const { manv } = req.query;
        const {ten } = req.query;
        if (ten) {
            documents = await qlnvService.findByName(ten);
        }
        
        if (manv) {
            documents = await qlnvService.findByManv(manv);
        } else {
            documents = await qlnvService.find({});
        }
    } catch (error) {
        return next(
            new ApiError(500, "An error occured while retrieving contacts")
        );
    }

    return res.send(documents);
};

//Find a single contact with an id
exports.findOne = async (req, res,next) => {
    try {
        const qlnvService = new QlnvService(MongoDB.client);
        const document = await qlnvService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
            return next(
                new ApiError(
                    500,
                    `Error retrieving contact with id = ${req.params.id}`
                )
            );
    }
};

//Update a contact by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update cannot be empty"));
    }

    try {
        const qlnvService = new QlnvService(MongoDB.client);
        const document = await qlnvService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: "Contact was update successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id = ${req.params.id}`)
        );
    }
};

//Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const qlnvService = new QlnvService(MongoDB.client);
        const document = await qlnvService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(
                500,
                `Could not delete contact with id = ${req.params.id}`
            )
        );
    }
};



//Delete all contacts of a user from database
exports.deleteAll = async (req, res, next) => {
    try {
        const qlnvService = new QlnvService(MongoDB.client);
        const deletedCount = await qlnvService.deleteAll();
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    } catch (error){
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
}


