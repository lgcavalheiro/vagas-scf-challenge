const getUserCount = require('../src/teste5');

const mockReq = {
    query: {
        name: 'John',
    },
};

const mockRes = {
    send: jest.fn(),
};

describe('getUserCount', () => {
    beforeEach(() => {
        mockRes.send.mockClear();
    });

    test('should send the user count message', () => {
        getUserCount(mockReq, mockRes);

        expect(mockRes.send).toHaveBeenCalledWith('Usuário John foi lido 0 vezes.');
    });
});
