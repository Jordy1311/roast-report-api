# Roast Report API

This is the backend to the frontend located over in [this repo](https://github.com/Jordy1311/roast-report).

It's responsible for everything including auth.

## To run this app

1. Create a `.env` at the repo root and define the following variables:

```
PORT=<port the app will run on>
MONGODB_URI=<your own mongodb connectionString>
ACCESS_TOKEN_SECRET=<your own random secret>
```

2. Run `npm ci`

3. Run `npm run dev`

The server will start on the specified port (or 3000 as a default) and connect to your mongoDB instance.

You don't have to run in development mode but you will have to build and run in seperate commands and you also get the advantage of seeing your code changes instantly so you can play around.
