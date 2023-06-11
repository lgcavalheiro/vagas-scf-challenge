const updateUser = require('../teste4');
const fakeData = require('../fakeData');

const mockReq = {
    query: {
        id: '1',
    },
    body: {
        name: 'John Doe',
        job: 'Software Engineer',
    },
};

const mockRes = {
    send: jest.fn(),
};

describe('updateUser', () => {
    beforeEach(() => {
        mockRes.send.mockClear();
        fakeData.length = 0;
        fakeData.push({ id: '1', name: 'John', job: 'Developer' });
    });

    test('should update the user and send the updated user data', () => {
        updateUser(mockReq, mockRes);

        expect(fakeData).toHaveLength(1);
        expect(fakeData[0]).toEqual({
            id: '1',
            name: 'John Doe',
            job: 'Software Engineer',
        });

        expect(mockRes.send).toHaveBeenCalledWith(fakeData[0]);
    });

    test('should not update any user if the id does not match', () => {
        const anotherMockReq = {
            query: {
                id: '456',
            },
            body: {
                name: 'Jane',
                job: 'Designer',
            },
        };

        updateUser(anotherMockReq, mockRes);

        expect(fakeData).toHaveLength(1);
        expect(fakeData[0]).toEqual({ id: '1', name: 'John', job: 'Developer' });

        expect(mockRes.send).toHaveBeenCalledWith("not found");
    });
});
