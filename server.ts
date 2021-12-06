import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";

interface ISnippet {
  id: number;
  title: string;
  createdAt: number;
  text: string;
}

config(); //Read .env file lines as though they were env vars.

//Call this script with the environment variable LOCAL set if you want to connect to a local db (i.e. without SSL)
//Do not set the environment variable LOCAL if you want to connect to a heroku DB.

//For the ssl property of the DB connection config, use a value of...
// false - when connecting to a local DB
// { rejectUnauthorized: false } - when connecting to a heroku DB
const herokuSSLSetting = { rejectUnauthorized: false };
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting;
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

const app = express();

app.use(express.json()); //add body parser to each following route handler
app.use(cors()); //add CORS support to each following route handler

const client = new Client({ database: "pastebin" });
// COME BACK TO THIS
//const client = new Client(dbConfig);
async function connectClient() {
  await client.connect();
  console.log("Connected to DB");
}
connectClient();

// GET /snippets
app.get("/snippets", async (req, res) => {
  const dbres = await client.query("select * from snippets LIMIT 10");
  const snippets = dbres.rows;
  res.status(200).json({
    status: "success",
    data: snippets,
  });
});

// GET /snippet:id
app.get("/snippets/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const dbres = await client.query("select * from snippets where id=$1", [id]);
  const snippets = dbres.rows;
  res.status(200).json({
    status: "success",
    data: snippets,
  });
});

// CREATE /snippets
app.post<{}, {}, ISnippet>("/snippets", async (req, res) => {
  const { title, text } = req.body;
  const result = await client.query(
    "INSERT INTO snippets VALUES (DEFAULT, $1, DEFAULT, $2) RETURNING *",
    [title, text]
  );
  const snippet = result.rows;
  if (result.rowCount === 1) {
    res.status(201).json({
      status: "success",
      data: {
        snippet,
      },
    });
  } else {
    res.status(404).json(result);
  }
});

// DELETE /snippet/:id
app.delete<{ id: string }>("/snippets/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const getSnippetById = await client.query(
    "SELECT * FROM snippets WHERE id = ($1)",
    [id]
  );

  if (getSnippetById) {
    const queryResult: any = await client.query(
      "DELETE FROM snippets WHERE id = ($1) RETURNING *",
      [id]
    );
    if (queryResult.rowCount === 1) {
      res.status(200).json({
        status: "success",
        data: { deleted_id: queryResult.rows[0].id },
      });
    } else {
      res.status(500).json({
        status: "fail",
        data: {
          id: "Something went wrong with deletion.",
        },
      });
    }
  } else {
    res.status(404).json({
      status: "fail",
      data: {
        id: "Could not find a snippet with that id.",
      },
    });
  }
});

//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw "Missing PORT environment variable.  Set it in .env file.";
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
