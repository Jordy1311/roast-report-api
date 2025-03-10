export interface FieldDefinition {
  fieldName: string;
  type: "string" | "array" | "number";
  isRequired?: boolean;
}

/**
 * Generates a 16-character long string including numbers and lowercase letters.
 * This is used for generating confimration codes of login.
 *
 * @returns A 16-character long string.
 */
export function generateRandomString(): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
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
    const isRequiredAndEmptyString =
      isRequired && expectedType === "string" && fieldValue === "";
    const typeMismatch = typeof fieldValue !== expectedType;
    const expectedArrayButNotArray =
      expectedType === "array" && !Array.isArray(fieldValue);

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
 * Checks whether an input string is a valid email address.
 *
 * @param email The input string to check.
 * @returns True if the input is a valid email address, otherwise false.
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
export function pick(object: Record<string, unknown>, properties: string[]) {
  const requestedProperties: Record<string, unknown> = {};

  for (const property of properties) {
    //const hasValue = object[property] != false;
    if (object.hasOwnProperty(property)) {
      requestedProperties[property] = object[property];
    }
  }

  return requestedProperties;
}
