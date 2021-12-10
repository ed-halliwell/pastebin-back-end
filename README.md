# Academy Project: PasteBin

A simple application to allow the saving of text snippets.

- <a href="https://github.com/ed-halliwell/pastebin-front-end">Front End Application GitHub Repository</a>
- <a href="https://github.com/ed-halliwell/pastebin-back-end">Back End Application GitHub Repository</a>
- <a href="https://www.notion.so/weareacademy/Team-C3A3-PasteBin-Project-1-23f250347b0245a0a3c8afe99ca9287b">Documentation</a>

## Install

`yarn`

## DB Setup

Copy .env.example to .env and set `DATABASE_URL` and `PORT` to your liking.

Example for a local database: `DATABASE_URL=postgres://neill@localhost/pastebin`

You will need to create your own databases for this project - one locally and one on Heroku.

## Running locally

`yarn start:dev`

This will set the env var LOCAL to true, which will cause the db connection configuration to NOT use SSL (appropriate for your local db)

## Running on heroku

When the project is deployed to heroku, the command in your `Procfile` file will be run.

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a>
