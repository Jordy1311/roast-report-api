# Roast Report API ☕️
<!--toc:start-->
This is the back-end API for Roast Report - a coffee roast tracking app.

Find out more about this project in the [front-end repo](https://github.com/Jordy1311/roast-report).

You'll find the live project [here](https://roastreport.web.app/).

## To run yourself 🏃

There really isn't a need to run this yourself but if you wanted to fork or take
a nosey at some very standard code see below.

### Prerequisites

* Node.js (I use version 22.14.0)
* MongoDB instance
* A Gmail account for sending emails

### Setup & Running the Application

1. Clone this repo
2. Set up a `.env` file at the root of the project as below
3. Install packages with either Yarn or NPM
4. Run `npm run dev`

The server will start and reload on any file changes.

Note: This will be serving the source files directly so no build step is
required for development.

### `.env` Example

```dotenv
PORT=3000
DOMAIN=<the-url-to-this-server>
FE_DOMAIN=<the-url-to-the-frontend>

ACCESS_TOKEN_SECRET=<your-own-random-secret> # Used for signing JWTs

MONGODB_URI=<your-own-mongodb-connectionString>

EMAIL_USER=<a-gmail-account-to-send-signup/signin-emails-from>
EMAIL_KEY=<a-key-generated-on-the-gmail-account>
# See: https://www.nodemailer.com/usage/using-gmail/
