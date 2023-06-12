const { getUser, getUsers } = require('../src/teste1');
const fakeData = require('../src/fakeData');

const mockRes = {
    send: jest.fn(),
};

describe('getUser', () => {
    beforeEach(() => {
        mockRes.send.mockClear();
    });

    test('should send user data if found', () => {
        const mockReq = {
            query: { name: 'João Oliveira' },
        };

        getUser(mockReq, mockRes);

        expect(mockRes.send).toHaveBeenCalledWith(fakeData[0]);
    });

    test('should send "not found" if user is not found', () => {
        const mockReq = {
            query: { name: 'Nonexistent' },
        };

        getUser(mockReq, mockRes);

        expect(mockRes.send).toHaveBeenCalledWith('not found');
    });
});

describe('getUsers', () => {
    test('should send all users data', () => {
        const mockReq = {};

        getUsers(mockReq, mockRes);

        expect(mockRes.send).toHaveBeenCalledWith(fakeData);
    });
});
