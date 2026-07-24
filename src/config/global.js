const RESPONSE = {
    SUCCESS: {
        code: 200,
        message: " Everything worked as expected",
    },

    UNK_ERR: {
        code: 500,
        message: " Something went wrong",
    },

    REQUIRED: {
        code: 201,
        message: " Is required",
    },

    NOT_FOUND: {
        code: 400,
        message: " Is not found",
    },

    INVALID_ID: {
        code: 300,
        message: " Invalid",
    },

    ALREADY_EXISTS: {
        code: 409,
        message: " Already exists",
    },

    MULTER_ERR: {
        code: 400,
        message: " File upload error",
    },
};

export default RESPONSE;