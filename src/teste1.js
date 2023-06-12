var data = require("./fakeData");

const getUser = (req, res, next) => {

    var name = req.query.name;

    // TODO: Fixed, but search is too strict
    for (let i = 0; i < data.length; i++) {
        if (data[i].name == name) {
            res.send(data[i]);
            return
        }
    }

    res.send("not found")
};

const getUsers = (req, res, next) => {

    res.send(data);

};

module.exports = {
    getUser,
    getUsers
};