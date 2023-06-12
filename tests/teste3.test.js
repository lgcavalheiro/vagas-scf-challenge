const deleteUser = require('../src/teste3');
const fakeData = require('../src/fakeData');

const mockReq = {
    query: {
        name: 'João Oliveira',
    },
};

const mockRes = {
    send: jest.fn(),
};

describe('deleteUser', () => {
    beforeEach(() => {
        mockRes.send.mockClear();
    });

    test('should delete the user and send "success"', () => {
        deleteUser(mockReq, mockRes);

        expect(fakeData).toHaveLength(0);

        expect(mockRes.send).toHaveBeenCalledWith('success');
    });

    test('should not delete any user if the name does not match', () => {
        fakeData.push({ name: 'John', job: 'Developer' });

        const anotherMockReq = {
            query: {
                name: 'Jane',
            },
        };

        deleteUser(anotherMockReq, mockRes);

        expect(fakeData).toHaveLength(1);
        expect(fakeData[0]).toEqual({ name: 'John', job: 'Developer' });

        expect(mockRes.send).toHaveBeenCalledWith('success');
    });
});
