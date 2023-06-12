const deleteUser = require("../src/teste3");
const UsersDB = require("../src/fakeData");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

const mockReq = {
  query: {
    name: "João Oliveira",
  },
};

const mockRes = {
  send: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

describe("deleteUser", () => {
  beforeEach(() => {
    mockRes.send.mockClear();
    mockRes.status.mockClear();
  });

  test('should delete the user and send "OK"', () => {
    deleteUser(mockReq, mockRes);

    expect(UsersDB.getAll()).toHaveLength(0);

    expect(mockRes.send).toHaveBeenCalledWith(
      STATUS_CODES[constants.HTTP_STATUS_OK]
    );
  });

  test("should not delete any user if the name does not match", () => {
    UsersDB.getAll().push({ name: "John", job: "Developer" });

    const anotherMockReq = {
      query: {
        name: "Jane",
      },
    };

    deleteUser(anotherMockReq, mockRes);

    expect(UsersDB.getAll()).toHaveLength(1);
    expect(UsersDB.getAll()[0]).toEqual({ name: "John", job: "Developer" });

    expect(mockRes.send).toHaveBeenCalledWith(
      STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]
    );
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_NOT_FOUND
    );
  });
});
