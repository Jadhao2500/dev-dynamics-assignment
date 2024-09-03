import { VALID_DATA_TYPES } from "../constant";

export class util {
  static validateDataType(value: unknown, type: string): boolean {
    if (!value) return false;

    const valueType = typeof value;

    switch (type) {
      case VALID_DATA_TYPES.STRING:
      case VALID_DATA_TYPES.NUMBER:
      case VALID_DATA_TYPES.BOOLEAN:
      case VALID_DATA_TYPES.FUNCTION:
        return Boolean(valueType === type && value);
      case VALID_DATA_TYPES.ARRAY:
        return Boolean(Array.isArray(value) && value);
      case VALID_DATA_TYPES.OBJECT:
        return Boolean(
          Object.keys(value).length && !Array.isArray(value) && value
        );
      default:
        return false;
    }
  }
}
