export const successResponse = (res, status, message, data) => {
    return res.status(status).json({
        status: status,
        message: message,
        data: data
    })
}

export const paginate = (page, limit, count, rows) => {
    return {
        currentPage: page,
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        result: rows
    }
}

export const errorClientResponse = (res, status, message) => {
    return res.status(status).json({
        status: status,
        message: message
    })
}

export const errorServerResponse = (res, error) => {
    console.log(error);
    return res.status(500).json({
        status: 500,
        message: "internal server error"
    })
}