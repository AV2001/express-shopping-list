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

describe('GET /items/:name', () => {
    test('it should return an item provided valid name', async () => {
        const response = await request(app).get(`/items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(item);
    });

    test('it should return 404 provided an invalid name', async () => {
        const response = await request(app).get('/items/cheerios');
        expect(response.statusCode).toBe(404);
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

describe('PATCH /items/:name', () => {
    test('it should update the item based on the name that is passed and return the newly updated item', async () => {
        const newItem = { name: 'bread', price: '0.99' };
        const response = await request(app)
            .patch(`/items/${item.name}`)
            .send(newItem);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ updated: newItem });
    });

    test('it should update item even if just the name is provided (keeps price intact)', async () => {
        const response = await request(app)
            .patch(`/items/${item.name}`)
            .send({ name: 'bread' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            updated: { name: 'bread', price: item.price },
        });
    });

    test('it should update item even if just the price is provided (keeps name intact) ', async () => {
        const response = await request(app)
            .patch(`/items/${item.name}`)
            .send({ price: 4.5 });
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            updated: { name: item.name, price: 4.5 },
        });
    });

    test('it should return 404 provided an invalid name', async () => {
        const response = await request(app).patch('/items/cheerios');
        expect(response.statusCode).toBe(404);
    });
});

describe('DELETE /items/:name', () => {
    test('it should delete an item', async () => {
        const response = await request(app).delete(`/items/${item.name}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ message: 'Deleted!' });
    });

    test('it should return 404 provided an invalid name', async () => {
        const response = await request(app).delete('/items/cheerios');
        expect(response.statusCode).toBe(404);
    });
});
