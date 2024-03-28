export interface FieldDefinition {
  fieldName: string;
  type: string | number | null,
  isRequired?: boolean;
}

// TODO: send back nice error message to client rather than 👍 or 👎
// TODO: write a nice definition for this function or get AI to do that
export function isValidRequest(
  requestBody: Record<string, unknown>,
  fieldDefinitions: FieldDefinition[],
): boolean {
  for (const fieldDefinition of fieldDefinitions) {
    const { fieldName, type: expectedType, isRequired = false } = fieldDefinition;
    const fieldValue = requestBody[fieldName];

    // required field is not provided
    if (fieldValue === undefined && isRequired) {
      return false;
    }

    // required field is expected to be string type and is empty
    if (isRequired && expectedType === 'string' && fieldValue === '') {
      return false;
    }

    // field is not expected type
    if (fieldValue !== undefined && typeof fieldValue !== expectedType) {
      return false;
    }
  }

  return true;
}

// TODO: write a nice definition for this function or get AI to do that
export function pick(
  object: Record<string, unknown>,
  properties: string[],
) {
  const requestedProperties: Record<string, unknown> = {};

  for (const property of properties) {
    if (object.hasOwnProperty(property) && object[property] != false) {
      requestedProperties[property] = object[property];
    }
  }

  return requestedProperties;
}
