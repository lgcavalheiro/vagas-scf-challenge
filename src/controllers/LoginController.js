const loginService = require("../services/LoginService");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

const postLogin = (req, res, next) => {
  const id = req.body.id;
  if (!Number.isInteger(id) || id < 0) {
    res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .send(STATUS_CODES[constants.HTTP_STATUS_BAD_REQUEST]);
    return;
  }

  const loginResponse = loginService.login(id);
  if (!loginResponse || !loginResponse.token)
    res
      .status(constants.HTTP_STATUS_UNAUTHORIZED)
      .send(STATUS_CODES[constants.HTTP_STATUS_UNAUTHORIZED]);

  res.send(loginResponse);
};

module.exports = { postLogin };
