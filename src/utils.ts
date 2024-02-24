import { Request } from 'express';

function _getDeepKeys(object: any): string[] {
  let keys: string[] = [];
  for (const key in object) {
    keys.push(key);
    if (typeof object[key] === "object") {
      const subKeys = _getDeepKeys(object[key]);
      keys = keys.concat(subKeys.map((subKey) => key + "." + subKey));
    }
  }
  return keys;
}

/**
 * @function hasRequiredProperties
 * @description Takes an array of property strings and checks that the request has all of them. If dealing with nested objects,
 * use dot notation to describe.
 *
 * @param {string[]} requiredProperties - An array of the required properties (if nested objects, use dot notation).
 * @param {Request} request - The request to be checked.
 */
export function hasRequiredProperties(requiredProperties: string[], request: Request<any>): boolean {
  return requiredProperties.every(
    (requiredProperty) => _getDeepKeys(request.body).includes(requiredProperty)
  );
}
