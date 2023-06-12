const { getUser, getUsers } = require("../src/teste1");
const fakeData = require("../src/fakeData");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

const mockReq = {
  query: {
    name: "oliv",
  },
};

const mockRes = {
  send: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

describe("getUser", () => {
  beforeEach(() => {
    mockRes.send.mockClear();
    mockRes.status.mockClear();
  });

  test("should send user data if found", () => {
    getUser(mockReq, mockRes);

    expect(mockRes.send).toHaveBeenCalledWith(fakeData[0]);
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  test("should send 404 error if user is not found", () => {
    const anotherMockReq = {
      query: {
        name: "Nonexistent",
      },
    };

    getUser(anotherMockReq, mockRes);

    expect(mockRes.send).toHaveBeenCalledWith(
      STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]
    );
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_NOT_FOUND
    );
  });
});

describe("getUsers", () => {
  beforeEach(() => {
    mockRes.send.mockClear();
    mockRes.status.mockClear();
  });

  test("should send all users data", () => {
    const mockReq = {};

    getUsers(mockReq, mockRes);

    expect(mockRes.send).toHaveBeenCalledWith(fakeData);
    expect(mockRes.status).not.toHaveBeenCalled();
  });
});
