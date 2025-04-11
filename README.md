# Roast Report API

This is the backend to the frontend located in [this repo](https://github.com/Jordy1311/roast-report).

Auth is achieved through an email only approach using the user's access to their emails as a sort of password.

JWTs are issued without expiry and there is yet to be a refreshing token mechanism.

## To run:

There is a docker file which you can build and run locally or you can follow the process below.
NOTE: you will still need to create and pass the docker container a .env with the variables described below.

1. Clone this repo

2. Create a `.env` at the root dir and define:

```
PORT=<port the app will run on>
MONGODB_URI=<your own mongodb connectionString>
ACCESS_TOKEN_SECRET=<your own random secret>
EMAIL_USER=<a gmail account to send signup/signin emails to>
EMAIL_KEY=<a key generated on the gmail account to allow nodemailer to send emails>
# email docs here: https://www.nodemailer.com/usage/using-gmail/
```

3. Run `npm ci`

4. Run `npm run dev`

<br/>

The server will start on the specified port (_or 3000 if not specified_) and connect to your mongoDB instance.

You don't have to run in development mode but you will have to `build` and `run` in seperate commands. This way is just quick and allows for code changes to trigger reloading.
