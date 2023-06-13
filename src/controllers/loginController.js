const loginService = require("../services/loginService");
const { validateIntField } = require("../utils/validation");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

// from teste6
const postLogin = (req, res, next) => {
  const id = req.body.id;

  const error = validateIntField(id, "id");
  if (error) {
    res.status(constants.HTTP_STATUS_BAD_REQUEST).json({ errors: [error] });
    return;
  }

  const loginResponse = loginService.login(id);
  if (!loginResponse || !loginResponse.token)
    res
      .status(constants.HTTP_STATUS_UNAUTHORIZED)
      .json(STATUS_CODES[constants.HTTP_STATUS_UNAUTHORIZED]);

  res.json(loginResponse);
};

module.exports = { postLogin };
