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
    test('it should return all items', async () => {
        const response = await request(app).get('/items');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([item]);
    });
});

describe('POST /items', () => {
    test('it should add an item', async () => {
        const newItem = { name: 'cheerios', price: 3.4 };
        const response = await request(app).post('/items').send(newItem);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ added: newItem });
    });

    test('it should response with 400 if missing name and price', async () => {
        const response = await request(app).post('/items');
        expect(response.statusCode).toBe(400);
    });

    test('it should respond with 400 if missing name', async () => {
        const newItem = { price: 3.4 };
        const response = await request(app).post('/items').send(newItem);
        expect(response.statusCode).toBe(400);
    });

    test('it should respond with 400 if missing price', async () => {
        const newItem = { name: 'cheerios' };
        const response = await request(app).post('/items').send(newItem);
        expect(response.statusCode).toBe(400);
    });
});
