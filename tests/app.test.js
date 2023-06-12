const request = require('supertest');
const { createApp } = require('../src/app');
const teste1 = require('../src/teste1');
const teste2 = require('../src/teste2');
const teste3 = require('../src/teste3');
const teste4 = require('../src/teste4');
const teste5 = require('../src/teste5');

teste1.getUser = jest.fn((req, res) => res.send('getUser response'));
teste1.getUsers = jest.fn((req, res) => res.send('getUsers response'));

jest.mock('../src/teste2')
teste2.mockImplementation((req, res) => res.send('postUsers response'))

jest.mock('../src/teste3')
teste3.mockImplementation((req, res) => res.send('deleteUsers response'));

jest.mock('../src/teste4')
teste4.mockImplementation((req, res) => res.send('putUsers response'));

jest.mock('../src/teste5')
teste5.mockImplementation((req, res) => res.send('getUsersAccess response'));

describe('App Routes', () => {
    let app;

    beforeAll(() => {
        app = createApp();
    });

    test('GET / should return a list of available routes', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain('get user/');
        expect(response.text).toContain('get users/');
        expect(response.text).toContain('post users/');
        expect(response.text).toContain('delete users/');
        expect(response.text).toContain('put users/');
    });

    test('GET /user should call teste1.getUser and return the response', async () => {
        const response = await request(app).get('/user');
        expect(response.status).toBe(200);
        expect(response.text).toBe('getUser response');
        expect(teste1.getUser).toHaveBeenCalled();
    });

    test('GET /users should call teste1.getUsers and return the response', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.text).toBe('getUsers response');
        expect(teste1.getUsers).toHaveBeenCalled();
    });

    test('POST /users should call teste2 and return the response', async () => {
        const response = await request(app).post('/users');
        expect(response.status).toBe(200);
        expect(response.text).toBe('postUsers response');
        expect(teste2).toHaveBeenCalled();
    });

    test('DELETE /users should call teste3 and return the response', async () => {
        const response = await request(app).delete('/users');
        expect(response.status).toBe(200);
        expect(response.text).toBe('deleteUsers response');
        expect(teste3).toHaveBeenCalled();
    });

    test('PUT /users should call teste4 and return the response', async () => {
        const response = await request(app).put('/users');
        expect(response.status).toBe(200);
        expect(response.text).toBe('putUsers response');
        expect(teste4).toHaveBeenCalled();
    });

    test('GET /users/access should call teste5 and return the response', async () => {
        const response = await request(app).get('/users/access');
        expect(response.status).toBe(200);
        expect(response.text).toBe('getUsersAccess response');
        expect(teste5).toHaveBeenCalled();
    });
});
