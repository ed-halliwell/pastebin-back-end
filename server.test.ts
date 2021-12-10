import supertest from "supertest";
import app from "./server";

describe("GET /snippets", () => {
  it("retrieves all the snippets store in the snippets table", async () => {
    const response = await supertest(app).get("/snippets");
    expect(response.body.message).toMatch("Retrieved snippets");
  });
});
