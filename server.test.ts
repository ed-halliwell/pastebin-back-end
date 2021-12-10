import supertest from "supertest";
import app, { client, server } from "./server";

describe("GET /snippets", () => {
  test("retrieves all the snippets store in the snippets table", async () => {
    const response = await supertest(app).get("/snippets");
    expect(response.status).toEqual(200);
    expect(response.body.message).toMatch("Retrieved snippets");
  });
  test("retrieves specific number of snippets", async () => {
    const response = await supertest(app).get("/snippets?limit=4");
    expect(response.body.data.length).toEqual(4);
    expect(response.body.message).toMatch("Retrieved snippets");
    expect(response.status).toEqual(200);
  });
  test("if limit over 100, returns 100 or fewer snippets", async () => {
    const response = await supertest(app).get("/snippets?limit=101");
    expect(response.status).toEqual(200);
    expect(response.body.message).toMatch("Retrieved snippets");
    expect(response.body.data.length).toBeLessThanOrEqual(100);
  });
  test("if limit is 0 or less, returns 400 response", async () => {
    const response = await supertest(app).get("/snippets?limit=-1");
    expect(response.status).toEqual(400);
    expect(response.body.message).toMatch("Bad request");
  });
  test("if limit is not a number, returns 400 response", async () => {
    const response = await supertest(app).get("/snippets?limit=hello");
    expect(response.status).toEqual(400);
    expect(response.body.message).toMatch("Bad request");
  });
});

afterAll(() => {
  client.end();
  server.close();
});
