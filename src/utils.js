import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';


const utils = {
  /**
   * Returns true if the specified value is not undefined.
   *
   * @param {?} val Variable to test.
   * @return {boolean} Whether variable is defined.
   */
  isDef(val) {
    // void 0 always evaluates to undefined and hence we do not need to depend on
    // the definition of the global variable named 'undefined'.
    // eslint-disable-next-line no-void
    return val !== void 0;
  },

  /**
   *
   * @param {string} val
   * @return {boolean}
   */
  isEmptyString(val) {
    return val.trim().length === 0;
  },

  /**
   *
   * @param {string} val
   * @return {boolean}
   */
  isNotEmptyString(val) {
    return val.trim().length > 0;
  },

  /**
   *
   * @param {*} val
   * @return {boolean}
   */
  isNotEmpty(val) {
    return isEmpty(val) === false;
  },

  /**
   * Compare function for string values by field.
   * @param {string} fieldName
   * @return {function(*, *):number}
   */
  compareStringByField(fieldName) {
    return (a, b) => a[fieldName].localeCompare(b[fieldName], undefined, { numeric: true });
  },

  /**
   * Number of digits greater than argument.
   *
   * Gets count of digits and compare with argument.
   * Note: this works only with integers, not floats.
   * @param {number} val
   * @param {number} digitsCount
   * @return {boolean}
   */
  numberOfDigitsGreaterThan(val, digitsCount) {
    return val.toString().length > digitsCount;
  },

  /**
   * Extract `obj` from directual response.
   * @param {Object} response
   * @return {Object}
   */
  extractResponseObject(response) {
    return get(response, 'obj', {});
  },

  /**
   * Extract array result from directual response.
   * @param {Object} response
   * @return {Array}
   */
  extractResponseArray(response) {
    return get(response, 'result.list', []);
  },
};

/**
 * Extract data from axios response.
 * @param {AxiosResponse} response
 * @return {*}
 */
export function extractResponseData(response) {
  return response.data;
}

export default utils;
