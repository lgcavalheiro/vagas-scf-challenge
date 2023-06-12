const updateUser = require("../src/teste4");
const fakeData = require("../src/fakeData");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

const mockReq = {
  query: {
    id: "1",
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

describe("updateUser", () => {
  beforeEach(() => {
    mockRes.send.mockClear();
    mockRes.status.mockClear();
    fakeData.length = 0;
    fakeData.push({ id: "1", name: "John", job: "Developer" });
  });

  test("should update the user and send the updated user data", () => {
    updateUser(mockReq, mockRes);

    expect(fakeData).toHaveLength(1);
    expect(fakeData[0]).toEqual({
      id: "1",
      name: "John Doe",
      job: "Software Engineer",
    });

    expect(mockRes.send).toHaveBeenCalledWith(fakeData[0]);
  });

  test("should not update any user if the id does not match", () => {
    const anotherMockReq = {
      query: {
        id: "456",
      },
      body: {
        name: "Jane",
        job: "Designer",
      },
    };

    updateUser(anotherMockReq, mockRes);

    expect(fakeData).toHaveLength(1);
    expect(fakeData[0]).toEqual({ id: "1", name: "John", job: "Developer" });

    expect(mockRes.send).toHaveBeenCalledWith(
      STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]
    );
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_NOT_FOUND
    );
  });
});
