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
  test("returns 100 or fewer snippets if limit query param is over 100", async () => {
    const response = await supertest(app).get("/snippets?limit=101");
    expect(response.status).toEqual(200);
    expect(response.body.message).toMatch("Retrieved snippets");
    expect(response.body.data.length).toBeLessThanOrEqual(100);
  });
  test("returns 400 response if limit is 0 or less", async () => {
    const response = await supertest(app).get("/snippets?limit=-1");
    expect(response.status).toEqual(400);
    expect(response.body.message).toMatch("Bad request");
  });
  test("returns 400 response if limit is not a number", async () => {
    const response = await supertest(app).get("/snippets?limit=hello");
    expect(response.status).toEqual(400);
    expect(response.body.message).toMatch("Bad request");
  });
});

describe("GET /snippets/1", () => {
  test("retrieves one snippets from the snippets table", async () => {
    const response = await supertest(app).get("/snippets/1");
    expect(response.status).toEqual(200);
    expect(response.body.message).toMatch("Retrieved snippet");
    expect(response.body.data).toHaveLength(1);
  });
  test("if snippet cannot be found, an error is returned", async () => {
    const response = await supertest(app).get("/snippets/0");
    expect(response.status).toEqual(404);
    expect(response.body.message).toStrictEqual(
      "Could not find a snippet with that ID."
    );
    expect(response.body.data).toStrictEqual({});
  });
});

afterAll(() => {
  client.end();
  server.close();
});
