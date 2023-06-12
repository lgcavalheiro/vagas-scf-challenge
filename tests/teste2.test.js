const addUser = require("../src/teste2");
const fakeData = require("../src/fakeData");

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

    expect(fakeData).toHaveLength(2);
    expect(fakeData[1]).toEqual({ id: 2, ...mockReq.body });

    expect(mockRes.send).toHaveBeenCalledWith({ id: 2, ...mockReq.body });
  });
});
