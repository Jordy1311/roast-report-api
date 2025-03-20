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
      return res.status(400).send("Missing fields or incorrect field types");
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
    return res.status(500).send("Internal server error");
  }
}

export async function getUsersRoasts(req: Request, res: Response) {
  try {
    const usersRoasts = await Roast.find({ userId: req.user!.id })
      .sort({ createdAt: 1 })
      .lean();

    return res.status(200).json(usersRoasts);
  } catch (err) {
    console.error(err);
    return res.status(500).json("Internal server error");
  }
}

export async function updateRoast(req: Request, res: Response) {
  try {
    const roastIdToBeUpdated = req.params.id;
    const roastToBeUpdated = await Roast.findOne({
      _id: roastIdToBeUpdated,
      userId: req.user!.id,
    }).lean();

    if (!roastToBeUpdated) {
      return res.sendStatus(404);
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
      return res.status(400).send("Missing fields or incorrect field types");
    }

    const cleanRoastData = pick(
      req.body,
      expectedFields.map((field) => field.fieldName),
    );

    const updatedRoast = await Roast.findOneAndUpdate(
      { _id: roastIdToBeUpdated, userId: req.user!.id },
      cleanRoastData,
      { new: true },
    );

    return res.status(200).json(updatedRoast);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
}

export async function deleteRoast(req: Request, res: Response) {
  try {
    const deleteResponse = await Roast.deleteOne({
      _id: req.params.id,
      userId: req.user!.id,
    });

    if (deleteResponse.deletedCount) {
      return res.sendStatus(204);
    } else {
      return res.sendStatus(404);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
}

export async function getDistinctRoasters(req: Request, res: Response) {
  const userId = req.user!.id;

  try {
    // users distinct roasters
    // ignoring case-sensitivity, diacritics, whitespace, and punctuation
    const usersRoasters = await Roast.distinct(
      'roaster',
      { userId },
      { collation: { locale: 'en', strength: 1, alternate: 'shifted' } }
    );

    // other users distinct roasters that are used by 2 or more different users
    const commonlyUsedRoastersByOthers = await Roast.aggregate([
      { $match: { userId: { $ne: userId } } },
      { $group: { _id: { roaster: "$roaster", userId: "$userId" } } },
      { $group: { _id: "$_id.roaster", userCount: { $sum: 1 } } },
      { $match: { userCount: { $gt: 1 } } },
      { $project: { _id: 0, roaster: "$_id" } }
    ]);

    const allRoasters: string[] = commonlyUsedRoastersByOthers.map(
      (item) => item.roaster
    );

    const mergedRoasters = Array.from(new Set([...usersRoasters, ...allRoasters]));

    return res.status(200).json(mergedRoasters);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
}
