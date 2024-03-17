import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js"; 

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/test");
});

afterAll(async () => {
  await mongoose.connection.close();

})

test('Post /login credenciales correctas', async () => {
  const response = await request(app).post("/api/login").send({
    email: "brasito45@gmail.com",
    password: "123456",
  });
  expect(response.body).toEqual({
    id: '654fe14ff6e7ff9c4ef02e94',
    name: 'Bryan',
    lastname: 'Ordoñez',
    email: 'brasito45@gmail.com',
    createdAt: '2023-11-11T20:17:19.650Z',
    updatedAt: '2023-11-11T20:17:19.650Z',
  });
  expect(response.statusCode).toBe(200);
}); 

test('Post /login credenciales incorrectas', async () => {
  const response = await request(app).post("/api/login").send({
    email: "brasito45@gmail.com",
    password: "1234567",
  });
  expect(response.statusCode).toBe(400);
  expect(response.text).toEqual(expect.stringMatching(/Constraseña incorrecta/));
  
}); 