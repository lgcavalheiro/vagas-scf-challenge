const updateUser = require("../src/teste4");
const UsersDB = require("../src/fakeData");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

const mockReq = {
  query: {
    id: 0,
  },
  body: {
    name: "John Doe",
    job: "Software Engineer",
  },
};

const mockRes = {
  send: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

const expectedUser = {
  id: 0,
  name: "John Doe",
  job: "Software Engineer",
  readCount: 2,
};

describe("updateUser", () => {
  beforeEach(() => {
    mockRes.send.mockClear();
    mockRes.status.mockClear();
  });

  test("should update the user and send the updated user data", () => {
    updateUser(mockReq, mockRes);

    expect(UsersDB.getAll()).toHaveLength(1);
    expect(UsersDB.getAll()[0]).toEqual(expectedUser);

    expect(mockRes.send).toHaveBeenCalledWith(UsersDB.getAll()[0]);
  });

  test("should not update any user if the id does not match", () => {
    const anotherMockReq = {
      query: {
        id: 456,
      },
      body: {
        name: "Jane",
        job: "Designer",
      },
    };

    updateUser(anotherMockReq, mockRes);

    expect(UsersDB.getAll()).toHaveLength(1);
    expect(UsersDB.getAll()[0]).toEqual(expectedUser);

    expect(mockRes.send).toHaveBeenCalledWith(
      STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]
    );
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_NOT_FOUND
    );
  });
});
