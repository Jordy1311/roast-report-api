import { Request, Response } from 'express';

import Roast from '../models/Roast';
import { FieldDefinition, isValidRequest, pick } from '../utils';

export async function createRoast(req: Request, res: Response) {
  try {
    // TODO: doing this everywhere will suck, we should make it better somehow
    const expectedFields: FieldDefinition[] = [
      { fieldName: 'name', type: 'string', isRequired: true },
      { fieldName: 'roaster', type: 'string', isRequired: true },
      { fieldName: 'origin', type: 'string' },
      { fieldName: 'composition', type: 'string' },
      { fieldName: 'processMethod', type: 'string' },
      { fieldName: 'roastedFor', type: 'string' },
      { fieldName: 'tastingNotes', type: 'string' },
      { fieldName: 'rating', type: 'string' },
      { fieldName: 'notes', type: 'string' },
    ];

    if (!isValidRequest(req.body, expectedFields)) {
      return res
        .status(400)
        .send('Invalid request body: missing or incorrect field types');
    }

    const cleanRoastData = pick(req.body, expectedFields.map((field) => field.fieldName));

    const newCoffee = await Roast.create(cleanRoastData);

    return res.status(201).json({ message: 'Roast created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' })
  }
}