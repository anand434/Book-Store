
// Authorization: Bearer <access_token>

function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    //console.log(bearerHeader)
    if(typeof(bearerHeader) !== 'undefined'){
        let bearer = bearerHeader.split(' ');
        let token = bearer[1];
        req.token = token;
        next();
    } else {
        res.status(403).json({message: "Bearer Header undefined"});
    }
}

module.exports = verifyToken