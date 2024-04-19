# Roast Report API

This is the backend to the frontend located in [this repo](https://github.com/Jordy1311/roast-report).

It's responsible for everything including auth.

## To run:

1. Clone this repo

2. Create a `.env` at the root dir and define:

```
PORT=<port the app will run on>
MONGODB_URI=<your own mongodb connectionString>
ACCESS_TOKEN_SECRET=<your own random secret>
```

3. Run `npm ci`

4. Run `npm run dev`

<br/>

The server will start on the specified port (_or 3000 if not specified_) and connect to your mongoDB instance.

You don't have to run in development mode but you will have to `build` and `run` in seperate commands and you also wont get the advantage of seeing code changes instantly. This is just the quickest way to get started. If you want or need different you'll probably already know where to look.
