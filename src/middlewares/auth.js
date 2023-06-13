const jwt = require("jsonwebtoken");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

// from teste6
const auth = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
        error: STATUS_CODES[constants.HTTP_STATUS_UNAUTHORIZED],
      });
      return;
    }

    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "JWT_AUTH_SECRET");

    if (!Number.isInteger(decodedToken.id) || decodedToken.id < 0) {
      res.status(constants.HTTP_STATUS_UNAUTHORIZED).json({
        error: STATUS_CODES[constants.HTTP_STATUS_UNAUTHORIZED],
      });
      return;
    }

    next();
  } catch {
    res.status(constants.HTTP_STATUS_BAD_GATEWAY).json({
      error: STATUS_CODES[constants.HTTP_STATUS_BAD_GATEWAY],
    });
  }
};

module.exports = auth;
