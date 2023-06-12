const loginController = require("../../src/controllers/LoginController");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

const mockRes = {
  send: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

describe("LoginController", () => {
  const mockReq = {
    body: {
      id: 0,
    },
  };

  beforeEach(() => {
    mockRes.send.mockClear();
    mockRes.status.mockClear();
  });

  test("should return response with token if login is successful", () => {
    loginController.postLogin(mockReq, mockRes);

    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.send).toHaveBeenCalledTimes(1);
  });

  test("should return bad request if id is invalid", () => {
    const invalidMockReq = {
      body: {
        id: 123.456,
      },
    };

    loginController.postLogin(invalidMockReq, mockRes);

    expect(mockRes.send).toHaveBeenCalledWith(
      STATUS_CODES[constants.HTTP_STATUS_BAD_REQUEST]
    );
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_BAD_REQUEST
    );
  });

  test("should return unauthorized if users is not found or is not an admin", () => {
    const invalidMockReq = {
      body: {
        id: 123,
      },
    };

    loginController.postLogin(invalidMockReq, mockRes);

    expect(mockRes.send).toHaveBeenCalledWith(
      STATUS_CODES[constants.HTTP_STATUS_UNAUTHORIZED]
    );
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_UNAUTHORIZED
    );
  });
});
