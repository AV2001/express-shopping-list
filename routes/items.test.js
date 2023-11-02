process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
const items = require('../fakeDb');

const item = { name: 'popsicle', price: 1.45 };

beforeEach(() => {
    items.push(item);
});

afterEach(() => {
    items.length = 0;
});

describe('GET /items', () => {
    test('', async () => {
        const response = await request(app).get('/items');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([item]);
    });
});
