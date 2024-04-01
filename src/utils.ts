export interface FieldDefinition {
  fieldName: string;
  type: 'string' | 'array',
  isRequired?: boolean;
}

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

    const isRequiredAndNotProvided = isRequired && fieldValue === undefined;
    const isRequiredAndEmptyString = isRequired && expectedType === 'string' && fieldValue === '';
    const typeMismatch = typeof fieldValue !== expectedType;
    const expectedArrayButNotArray = expectedType === 'array' && !Array.isArray(fieldValue);

    if (isRequiredAndNotProvided || isRequiredAndEmptyString) {
      return false;
    }

    if (fieldValue && typeMismatch && expectedArrayButNotArray) {
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
    const hasValue = object[property] != false;
    if (object.hasOwnProperty(property) && hasValue) {
      requestedProperties[property] = object[property];
    }
  }

  return requestedProperties;
}
