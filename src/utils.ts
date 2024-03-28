export interface FieldDefinition {
  fieldName: string;
  type: string | number | null,
  isRequired?: boolean;
}

// TODO: send back nice error message to client rather than 👍 or 👎
/**
 * Validates a request body against an expected structure.
 *
 * @param requestBody The data object from the request body.
 * @param expectedFields An array of FieldDefinition objects defining the expected structure.
 * @returns True if the request body is valid, otherwise false.
 */
export function isValidRequest(
  requestBody: Record<string, unknown>,
  expectedFields: FieldDefinition[],
): boolean {
  for (const field of expectedFields) {
    const { fieldName, type: expectedType, isRequired = false } = field;
    const fieldValue = requestBody[fieldName];

    // required field is not provided
    if (fieldValue === undefined && isRequired) {
      return false;
    }

    // required field is expected to be string type but is empty string
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

/**
 * Picks specific properties from an object, returning a new object with only the requested properties.
 * 
 * **Note:** This function can only pick properties from the top level of the object. It cannot pick 
 * properties from nested objects within the source object.
 *
 * @param object The source object to pick properties from.
 * @param properties An array of string keys representing the desired properties.
 * @returns A new object containing only the requested properties from the source object, 
 *          or an empty object if no properties exist or the source object is empty.
 */
export function pick(
  object: Record<string, unknown>,
  properties: string[],
) {
  const requestedProperties: Record<string, unknown> = {};

  for (const property of properties) {
    // TODO: this is a bit weird, clarify: object[property] != false
    if (object.hasOwnProperty(property) && object[property] != false) {
      requestedProperties[property] = object[property];
    }
  }

  return requestedProperties;
}
