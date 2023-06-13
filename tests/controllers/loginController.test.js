const loginController = require("../../src/controllers/loginController");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

const mockRes = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

describe("LoginController", () => {
  const mockReq = {
    body: {
      id: 0,
    },
  };

  beforeEach(() => {
    mockRes.json.mockClear();
    mockRes.status.mockClear();
  });

  test("should return response with token if login is successful", () => {
    loginController.postLogin(mockReq, mockRes);

    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).toHaveBeenCalledTimes(1);
  });

  test("should return bad request if id is invalid", () => {
    const invalidMockReq = {
      body: {
        id: "invalid",
      },
    };

    loginController.postLogin(invalidMockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({
      errors: ["Field 'id' is invalid or was not provided"],
    });
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_BAD_REQUEST
    );
  });

  test("should return unauthorized if user is not found or is not an admin", () => {
    const invalidMockReq = {
      body: {
        id: 123,
      },
    };

    loginController.postLogin(invalidMockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(
      STATUS_CODES[constants.HTTP_STATUS_UNAUTHORIZED]
    );
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_UNAUTHORIZED
    );
  });
});
