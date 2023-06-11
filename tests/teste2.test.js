const addUser = require('../teste2');
const fakeData = require('../fakeData');

const mockReq = {
    body: {
        name: 'John',
        job: 'Developer',
    },
};

const mockRes = {
    send: jest.fn(),
};

describe('addUser', () => {
    beforeEach(() => {
        mockRes.send.mockClear();
        fakeData.length = 0;
    });

    test('should add a new user and send the user data', () => {
        addUser(mockReq, mockRes);

        expect(fakeData).toHaveLength(1);
        expect(fakeData[0]).toEqual(mockReq.body);

        expect(mockRes.send).toHaveBeenCalledWith(mockReq.body);
    });
});
