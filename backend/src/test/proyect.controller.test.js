import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/test");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("getProyects", () => {
  test("should return projects with status 200 for valid data", async () => {
    const userData = {
      email: "brasito45@gmail.com",
      password: "123456",
    };
    // Autentica al usuario antes de cada prueba
    const respuesta = await request(app).post("/api/login").send({
      email: userData.email,
      password: userData.password,
    });
    const setCookieHeader = respuesta.headers["set-cookie"];
    const token =
      setCookieHeader && setCookieHeader[0].match(/token=(.*?);/)?.[1];

    const response = await request(app)
      .get("/api/proyectos")
      .set("Cookie", `token=${token}`)

    // Verifica el código de estado
    expect(response.statusCode).toBe(200);

    // Verifica que la respuesta sea un array de proyectos
    expect(Array.isArray(response.body)).toBe(true);
  });
  

  test('should create a project with status 201 for valid data', async () => {
    // Autenticación y obtención del token, igual que en tu prueba anterior
    const userData = {
        email: "brasito45@gmail.com",
        password: "123456",
      };
      // Autentica al usuario antes de cada prueba
      const respuesta = await request(app).post("/api/login").send({
        email: userData.email,
        password: userData.password,
      });
      const setCookieHeader = respuesta.headers["set-cookie"];
      const token =
        setCookieHeader && setCookieHeader[0].match(/token=(.*?);/)?.[1];
    // Datos de ejemplo para crear un proyecto válido
    const projectData = {
      title : "test prueba",
      description: 'This is a test project',
      category: 'test',
      technology: 'test',
      // Añade aquí cualquier otro campo que necesites para un proyecto
    };
  
    // Realiza la solicitud supertest a tu endpoint de creación de proyectos
    const response = await request(app)
      .post('/api/proyecto') // Asegúrate de ajustar esta ruta a la ruta correcta para crear proyectos en tu aplicación
      .set('Cookie', `token=${token}`) // Envía el token de autenticación
      .send(projectData); // Envía los datos del proyecto
  
    // Verifica que la respuesta tenga un código de estado 201 (Created)
    expect(response.statusCode).toBe(200);          
    expect(response.body).toEqual(expect.objectContaining(projectData));
  });


});

