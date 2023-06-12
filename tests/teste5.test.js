const getUserCount = require("../src/teste5");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

const mockReq = {
  query: {
    name: "John",
  },
};

const mockRes = {
  send: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

describe("getUserCount", () => {
  beforeEach(() => {
    mockRes.send.mockClear();
    mockRes.status.mockClear();
  });

  test("should send the user read count message", () => {
    const validMockReq = {
      query: {
        name: "João Oliveira",
      },
    };

    getUserCount(validMockReq, mockRes);

    expect(mockRes.send).toHaveBeenCalledWith(
      "Usuário João Oliveira foi lido 1 vez(es)."
    );
  });

  test("should send a not found message if no users are found", () => {
    getUserCount(mockReq, mockRes);

    expect(mockRes.send).toHaveBeenCalledWith(
      STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]
    );
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_NOT_FOUND
    );
  });
});
