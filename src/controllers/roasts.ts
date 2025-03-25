import { Request, Response } from "express";

import Roast from "../models/Roast";
import {
  FieldDefinition,
  isValidObjectId,
  isValidRequest,
  pick
} from "../utils";

export async function createRoast(req: Request, res: Response) {
  try {
    const newRoastData = req.body;
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

    if (!isValidRequest(newRoastData, expectedFields)) {
      return res.status(400).send({ message: "Missing fields or incorrect field types" });
    }

    // prevent user creating something we don't want
    const cleanRoastData = pick(
      newRoastData,
      expectedFields.map((field) => field.fieldName),
    );

    const newCoffee = await Roast.create({
      userId: req.user!.id,
      ...cleanRoastData,
    });

    return res.status(201).send(newCoffee);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

export async function getUsersRoasts(req: Request, res: Response) {
  try {
    const usersRoasts = await Roast
      .find({ userId: req.user!.id, deleted: { $ne: true } })
      .sort({ createdAt: 1 })
      .lean();

    return res.status(200).send(usersRoasts);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

export async function updateRoast(req: Request, res: Response) {
  try {
    const roastIdToBeUpdated = req.params.id;

    if (!roastIdToBeUpdated || !isValidObjectId(roastIdToBeUpdated)) {
      return res.status(400).send({ message: "Missing or invalid id" });
    }

    const roastToBeUpdated = await Roast.findOne({
      _id: roastIdToBeUpdated,
      userId: req.user!.id,
      deleted: { $ne: true },
    }).lean();

    if (!roastToBeUpdated) {
      return res.status(404).send(
        { message: `Roast with id: ${roastIdToBeUpdated} not found` }
      );
    }

    const updatedRoastData = req.body;
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

    if (!isValidRequest(updatedRoastData, expectedFields)) {
      return res.status(400).send({ message: "Missing fields or incorrect field types" });
    }

    const cleanRoastData = pick(
      updatedRoastData,
      expectedFields.map((field) => field.fieldName),
    );

    const updatedRoast = await Roast.findOneAndUpdate(
      { _id: roastIdToBeUpdated, userId: req.user!.id, deleted: { $ne: true } },
      cleanRoastData,
      { new: true },
    );

    return res.status(200).send(updatedRoast);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

export async function deleteRoast(req: Request, res: Response) {
  const roastIdToBeDeleted = req.params.id;

  if (!roastIdToBeDeleted || !isValidObjectId(roastIdToBeDeleted)) {
    res.status(400).send({ message: "Missing or invalid id" });
  }

  try {
    const deleteResponse = await Roast.findOneAndUpdate(
      { _id: roastIdToBeDeleted, userId: req.user!.id },
      { deleted: true },
      { new: true }
    );

    if (deleteResponse?.deleted) {
      return res.sendStatus(204);
    } else {
      return res.status(404).send(
        { message: `Roast with id: ${roastIdToBeDeleted} not found` }
      );
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

export async function getDistinctRoasters(req: Request, res: Response) {
  const userId = req.user!.id;
  const usesThreshold: number = 1;

  try {
    // users distinct roasters
    // ignoring case-sensitivity, diacritics, whitespace, and punctuation
    const usersRoasters = await Roast.distinct(
      'roaster',
      { userId, deleted: { $ne: true } },
      { collation: { locale: 'en', strength: 1, alternate: 'shifted' } }
    );

    // other users distinct roasters
    // that are used by more than {{ usesThreshold }} different users
    const commonlyUsedRoastersByOthers = await Roast.aggregate([
      { $match: { userId: { $ne: userId }, deleted: { $ne: true } } },
      { $group: { _id: { roaster: "$roaster", userId: "$userId" } } },
      { $group: { _id: "$_id.roaster", userCount: { $sum: 1 } } },
      { $match: { userCount: { $gt: usesThreshold } } },
      { $project: { _id: 0, roaster: "$_id" } }
    ]);

    const othersRoasters: string[] = commonlyUsedRoastersByOthers.map(
      (item) => item.roaster
    );

    const mergedRoasters = Array.from(new Set([...usersRoasters, ...othersRoasters]));

    return res.status(200).send(mergedRoasters);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}
