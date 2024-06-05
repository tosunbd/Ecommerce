module.exports.responseReturn = (res, code, data) => {
    return res.status(code).json(data);
}

// function responseReturn(res, statusCode, data, error = null)
// {
//     if (error)
//     {
//         res.status(statusCode).json({
//             success: false,
//             error: error
//         });
//     }
//     else
//     {
//         res.status(statusCode).json({
//             success: true,
//             data: data
//         });
//     }
// }
