const auth = require("../../src/middlewares/auth");
const jwt = require("jsonwebtoken");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

const mockRes = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

const mockNext = jest.fn();

describe("auth", () => {
  const mockReq = {
    headers: {
      authorization: "JWT token",
    },
  };

  beforeEach(() => {
    mockRes.json.mockClear();
    mockRes.status.mockClear();
    mockNext.mockClear();
  });

  test("should allow authentication if token is valid", () => {
    jwt.verify = jest.fn().mockReturnValueOnce({ id: 0 });

    auth(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  test("should return bad gateway if a bad token is provided", () => {
    auth(mockReq, mockRes, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_BAD_GATEWAY
    );
    expect(mockRes.json).toHaveBeenCalledWith({
      error: STATUS_CODES[constants.HTTP_STATUS_BAD_GATEWAY],
    });
  });

  test("should return unauthorized if a decoded token has an invalid id", () => {
    jwt.verify = jest.fn().mockReturnValueOnce({ id: 123.456 });

    auth(mockReq, mockRes, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_UNAUTHORIZED
    );
    expect(mockRes.json).toHaveBeenCalledWith({
      error: STATUS_CODES[constants.HTTP_STATUS_UNAUTHORIZED],
    });
  });
});
