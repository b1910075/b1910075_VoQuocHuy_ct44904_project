const ApiError = require("../api-error");
const QlcvService = require("../services/chucVu.service");
const MongoDB = require("../utils/mongodb.util");


//Create and Save a new Contact
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
            new ApiError(500,"An error occured while creating the contact")
        );
    }
};

// Retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const qlcvService = new QlcvService(MongoDB.client);

        documents = await qlcvService.find({});

    } catch (error) {
        return next(
            new ApiError(500, "An error occured while retrieving contacts")
        );
    }

    return res.send(documents);
};


//Update a contact by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0){
        return next(new ApiError(400, "Data to update cannot be empty"));
    }

    try {
        const qlcvService = new QlcvService(MongoDB.client);
        const document = await qlcvService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({message: " was update successfully"});
    } catch (error) {
        return next(
            new ApiError(500, `Error updating contact with id = ${req.params.id}`)
        );
    }
};

//Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const qlcvService = new QlcvService(MongoDB.client);
        const document = await qlcvService.delete(req.params.id);
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
        const qlcvService = new QlcvService(MongoDB.client);
        const deletedCount = await qlcvService.deleteAll();
        return res.send({
            message: `${deletedCount} contacts were deleted successfully`,
        });
    } catch (error){
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
}


