// request, response, next
// next : is used to execute the next middleware in the sequence
module.exports = function (req, res, next) {
    console.log(req.url);
next();
};
