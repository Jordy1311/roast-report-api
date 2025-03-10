import { Request, Response } from "express";

import Roast from "../models/Roast";
import { FieldDefinition, isValidRequest, pick } from "../utils";

export async function createRoast(req: Request, res: Response) {
  try {
    // TODO: doing this everywhere will suck, we should make it better somehow
    const expectedFields: FieldDefinition[] = [
      { fieldName: "name", type: "string", isRequired: true },
      { fieldName: "roaster", type: "string", isRequired: true },
      { fieldName: "origin", type: "array" },
      { fieldName: "composition", type: "string" },
      { fieldName: "processMethod", type: "string" },
      { fieldName: "roastedFor", type: "array" },
      { fieldName: "tastingNotes", type: "array" },
      { fieldName: "rating", type: "number" },
      { fieldName: "notes", type: "string" },
    ];

    if (!isValidRequest(req.body, expectedFields)) {
      return res.status(400).send({
        message: "Invalid request body: missing or incorrect field types",
      });
    }

    const cleanRoastData = pick(
      req.body,
      expectedFields.map((field) => field.fieldName),
    );

    const newCoffee = await Roast.create({
      userId: req.user!.id,
      ...cleanRoastData,
    });

    return res.status(201).json(newCoffee);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getUsersRoasts(req: Request, res: Response) {
  const usersRoasts = await Roast.find({ userId: req.user!.id })
    .sort({ createdAt: 1 })
    .limit(20)
    .lean();

  res.send(usersRoasts);
}

export async function updateRoast(req: Request, res: Response) {
  const roastIdToBeUpdated = req.params.id;
  const roastToBeUpdated = await Roast.findOne({
    _id: roastIdToBeUpdated,
  }).lean();

  if (!roastToBeUpdated) {
    return res
      .status(404)
      .send({ message: "Roast not found, unable to update" });
  }

  const expectedFields: FieldDefinition[] = [
    { fieldName: "name", type: "string" },
    { fieldName: "roaster", type: "string" },
    { fieldName: "origin", type: "array" },
    { fieldName: "composition", type: "string" },
    { fieldName: "processMethod", type: "string" },
    { fieldName: "roastedFor", type: "array" },
    { fieldName: "tastingNotes", type: "array" },
    { fieldName: "rating", type: "number" },
    { fieldName: "notes", type: "string" },
  ];

  if (!isValidRequest(req.body, expectedFields)) {
    return res
      .status(400)
      .send({ message: "Invalid request body: incorrect field types" });
  }

  const cleanRoastData = pick(
    req.body,
    expectedFields.map((field) => field.fieldName),
  );

  try {
    const updatedRoast = await Roast.findOneAndUpdate(
      { _id: roastIdToBeUpdated },
      cleanRoastData,
      { new: true, upsert: true },
    );

    return res.status(200).json(updatedRoast);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteRoast(req: Request, res: Response) {
  const deleteResponse = await Roast.deleteOne({ _id: req.params.id });

  if (deleteResponse.deletedCount) {
    return res.sendStatus(204);
  }
  return res.send(404);
}
