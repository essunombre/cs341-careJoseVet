const isAuthenticated = (req, res, next) => {
    if(req.session.user === undefined){
        return res.status(401).json("you do not have access bro.");
    }
    next();
};

module.exports = {
    isAuthenticated,
}