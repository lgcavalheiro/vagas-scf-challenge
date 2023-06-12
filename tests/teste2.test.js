const addUser = require("../src/teste2");
const UsersDB = require("../src/fakeData");

const mockReq = {
  body: {
    name: "John",
    job: "Developer",
  },
};

const mockRes = {
  send: jest.fn(),
};

describe("addUser", () => {
  beforeEach(() => {
    mockRes.send.mockClear();
  });

  test("should add a new user and send the user data", () => {
    addUser(mockReq, mockRes);

    expect(UsersDB.getAll()).toHaveLength(2);
    expect(UsersDB.getAll()[1]).toEqual({ id: 1, readCount: 0, ...mockReq.body });

    expect(mockRes.send).toHaveBeenCalledWith({
      id: 1,
      readCount: 0,
      ...mockReq.body,
    });
  });
});
