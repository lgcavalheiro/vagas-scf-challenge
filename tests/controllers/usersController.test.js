const usersController = require("../../src/controllers/usersController");
const UsersDB = require("../../src/fakeData");
const { STATUS_CODES } = require("http");
const { constants } = require("http2");

const mockRes = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

describe("getUser", () => {
  const mockReq = {
    query: {
      name: "oliv",
    },
  };

  beforeEach(() => {
    mockRes.json.mockClear();
    mockRes.status.mockClear();
  });

  test("should send user data if found", () => {
    usersController.getUser(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith([UsersDB.getAll()[0]]);
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  test("should send 404 error if user is not found", () => {
    const anotherMockReq = {
      query: {
        name: "invalid",
      },
    };

    usersController.getUser(anotherMockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(
      STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]
    );
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_NOT_FOUND
    );
  });

  test("should send bad request error if name is invalid", () => {
    const anotherMockReq = {
      query: {
        name: null,
      },
    };

    usersController.getUser(anotherMockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({
      errors: ["Field 'name' is invalid or was not provided"],
    });
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_BAD_REQUEST
    );
  });
});

describe("getUsers", () => {
  beforeEach(() => {
    mockRes.json.mockClear();
    mockRes.status.mockClear();
  });

  test("should send all users data", () => {
    const mockReq = {};

    usersController.getUsers(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(UsersDB.getAll());
    expect(mockRes.status).not.toHaveBeenCalled();
  });
});

describe("insertUser", () => {
  const mockReq = {
    body: {
      name: "John",
      job: "Developer",
    },
  };

  beforeEach(() => {
    mockRes.json.mockClear();
    mockRes.status.mockClear();
  });

  test("should add a new user and send the user data", () => {
    usersController.insertUser(mockReq, mockRes);

    expect(UsersDB.getAll()).toHaveLength(2);
    expect(UsersDB.getAll()[1]).toEqual({
      id: 1,
      readCount: 0,
      ...mockReq.body,
    });

    expect(mockRes.json).toHaveBeenCalledWith({
      id: 1,
      readCount: 0,
      ...mockReq.body,
    });
  });

  test("should return bad request if request is invalid", () => {
    const invalidMockReq = {
      body: {
        job: "    ",
      },
    };

    usersController.insertUser(invalidMockReq, mockRes);

    expect(UsersDB.getAll()).toHaveLength(2);

    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [
        "Field 'name' is invalid or was not provided",
        "Field 'job' is invalid or was not provided",
      ],
    });
  });
});

describe("deleteUser", () => {
  const mockReq = {
    query: {
      name: "João Oliveira",
    },
  };

  beforeEach(() => {
    mockRes.json.mockClear();
    mockRes.status.mockClear();
  });

  test('should delete the user and send "OK"', () => {
    usersController.deleteUser(mockReq, mockRes);

    expect(UsersDB.getAll()).toHaveLength(1);

    expect(mockRes.json).toHaveBeenCalledWith(
      STATUS_CODES[constants.HTTP_STATUS_OK]
    );
  });

  test("should not delete any user if the name does not match", () => {
    const anotherMockReq = {
      query: {
        name: "Jane",
      },
    };

    usersController.deleteUser(anotherMockReq, mockRes);

    expect(UsersDB.getAll()).toHaveLength(1);
    expect(UsersDB.getAll()[0]).toEqual({
      id: 1,
      name: "John",
      job: "Developer",
      readCount: 0,
    });

    expect(mockRes.json).toHaveBeenCalledWith(
      STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]
    );
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_NOT_FOUND
    );
  });

  test("should not delete any user and return bad request if name is invalid", () => {
    const anotherMockReq = {
      query: {
        name: null,
      },
    };

    usersController.deleteUser(anotherMockReq, mockRes);

    expect(UsersDB.getAll()).toHaveLength(1);
    expect(UsersDB.getAll()[0]).toEqual({
      id: 1,
      name: "John",
      job: "Developer",
      readCount: 0,
    });

    expect(mockRes.json).toHaveBeenCalledWith({
      errors: ["Field 'name' is invalid or was not provided"],
    });
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_BAD_REQUEST
    );
  });
});

describe("updateUser", () => {
  const mockReq = {
    query: {
      id: 1,
    },
    body: {
      name: "John Doe",
      job: "Software Engineer",
    },
  };

  const expectedUser = {
    id: 1,
    name: "John Doe",
    job: "Software Engineer",
    readCount: 1,
  };

  beforeEach(() => {
    mockRes.json.mockClear();
    mockRes.status.mockClear();
  });

  test("should update the user and send the updated user data", () => {
    usersController.updateUser(mockReq, mockRes);

    expect(UsersDB.getAll()).toHaveLength(1);
    expect(UsersDB.getAll()[0]).toEqual(expectedUser);

    expect(mockRes.json).toHaveBeenCalledWith(UsersDB.getAll()[0]);
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

    usersController.updateUser(anotherMockReq, mockRes);

    expect(UsersDB.getAll()).toHaveLength(1);
    expect(UsersDB.getAll()[0]).toEqual(expectedUser);

    expect(mockRes.json).toHaveBeenCalledWith(
      STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]
    );
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_NOT_FOUND
    );
  });

  test("should not update any user and return bad request if request is invalid", () => {
    const anotherMockReq = {
      query: {
        id: "invalid",
      },
      body: {
        name: "    ",
        job: null,
      },
    };

    usersController.updateUser(anotherMockReq, mockRes);

    expect(UsersDB.getAll()).toHaveLength(1);
    expect(UsersDB.getAll()[0]).toEqual(expectedUser);

    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [
        "Field 'id' is invalid or was not provided",
        "Field 'name' is invalid or was not provided",
        "Field 'job' is invalid or was not provided",
      ],
    });
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_BAD_REQUEST
    );
  });
});

describe("getUserAccess", () => {
  const mockReq = {
    query: {
      name: "Janet",
    },
  };

  beforeEach(() => {
    mockRes.json.mockClear();
    mockRes.status.mockClear();
  });

  test("should send the user read count message", () => {
    const validMockReq = {
      query: {
        name: "John Doe",
      },
    };

    usersController.getUserAccess(validMockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(
      "Usuário John Doe foi lido 1 vez(es)."
    );
  });

  test("should send a not found message if no users are found", () => {
    usersController.getUserAccess(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(
      STATUS_CODES[constants.HTTP_STATUS_NOT_FOUND]
    );
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_NOT_FOUND
    );
  });

  test("should return request errors if request is invalid", () => {
    const invalidMockReq = {
      query: {
        name: "   ",
      },
    };

    usersController.getUserAccess(invalidMockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith({
      errors: ["Field 'name' is invalid or was not provided"],
    });
    expect(mockRes.status).toHaveBeenCalledWith(
      constants.HTTP_STATUS_BAD_REQUEST
    );
  });
});
