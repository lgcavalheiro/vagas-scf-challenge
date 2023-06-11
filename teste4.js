var data = require("./fakeData");

module.exports = function (req, res) {

    var id = req.query.id;

    const reg = data.find(d => d.id === id);
    if (!reg) {
        res.send("not found")
        return
    }

    reg.name = req.body.name;
    reg.job = req.body.job;

    res.send(reg);

};