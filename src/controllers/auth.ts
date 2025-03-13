import { Request, Response } from "express";
const jwt = require("jsonwebtoken");

import LoginRequest from "../models/LoginRequest";
import User, { UserTokenPayload } from "../models/User";
import { sendEmail } from "../email";
import { isValidEmail, generateConfirmationCode } from "../utils";

export async function requestLogin(req: Request, res: Response) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("An email address is required");
  }

  if (!isValidEmail(email)) {
    return res.status(400).send("A valid email address is required");
  }

  try {
    const loginRequest =
      await LoginRequest.findOne({ email }).lean() ||
      await LoginRequest.create({ email, confirmationCode: generateConfirmationCode() });

    const emailSubject = 'Your Roast Report Login Request'
    const emailBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Hi there!</p>
        <p>We received a request to log you in to Roast Report. Please click the link below to complete your login:</p>
        <p>
          <a href="${process.env.FE_DOMAIN}/confirm-login/${loginRequest.confirmationCode}" style="color: #1a73e8;">Complete your login</a>
        </p>
        <p>If you did not request this login, please ignore this email.</p>
        <p>Thank you,<br>The Roast Report Team</p>
      </div>
    `;

    sendEmail([ email ], emailSubject, emailBody);

    return res.status(200).json({ status: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
}

export async function confirmLogin(req: Request, res: Response) {
  const { confirmationCode } = req.params;

  try {
    const loginRequest = await LoginRequest.findOne({ confirmationCode }).lean();

    if (!loginRequest) {
      return res.status(400).send("Login request expired or does not exist");
    }

    const email = loginRequest.email;

    const user =
      await User.findOne({ email }).lean() ||
      await User.create({ email });

    if (user) {
      await LoginRequest.deleteOne({ email, confirmationCode });

      const tokenPayload: UserTokenPayload = {
        id: user._id.toString(),
      };

      const accessToken = jwt.sign(
        tokenPayload,
        process.env.ACCESS_TOKEN_SECRET,
      );

      return res.status(200).json({ accessToken });
    } else {
      return res.status(500).send("Internal server error - no user found or created");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
}
