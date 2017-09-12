import axios from 'axios';
import { extractResponseData } from './utils';


// Example
// directual.api
//   .structure('agreement_status)
//   .save({ ... })
//   .then();

// `https://directual.com/good/api/v3/struct/agreement_status/list?appID=${config.APP_ID}&appSecret=${config.APP_SECRET}`

// {
//   filters: [
//     {
//       field: 'link_employee',
//       value: this.state.userId,
//       exp: '==',
//     },
//   ],
//   fetch: '',
//   fields: '',
//   pageSize: 10,
//   page: 0,
//   allObjects: true,
//   orders: [],
// }

const axiosInstance = axios.create({
  baseURL: '/good/api/v3',
  headers: {
    post: {
      'Content-Type': 'application/json',
    },
  },
});

class Endpoint {
  constructor() {
    this.type = null;
    this.name = null;
  }

  /**
   * Search.
   * @param {Object} options Search options.
   * @return {Promise}
   */
  search(options) {
    return axiosInstance
      .request({
        method: 'POST',
        url: `struct/${this.name}/search`,
        data: options,
      })
      .then(extractResponseData);
  }

  /**
   * Save (create/update) data.
   * @param {Object} data
   * @return {Promise}
   */
  save(data) {
    return axiosInstance
      .request({
        method: 'POST',
        url: `struct/${this.name}/`,
        data,
      })
      .then(extractResponseData);
  }

  /**
   *
   * @param {string} scenarioNames Scenario names separated by comma.
   * @param {Object} data
   * @param {string=} fields Fields that will be returned (separated by comma).
   * @return {Promise}
   */
  saveSync(scenarioNames, data, fields) {
    const params = {
      sync: true,
      pilotSysNames: scenarioNames,
    };

    if (fields) {
      params.fields = fields;
    }

    return axiosInstance
      .request({
        method: 'POST',
        url: `struct/${this.name}/`,
        params,
        data,
      })
      .then(extractResponseData);
  }


  /**
   *
   * @return {Promise}
   */
  list() {
    return axiosInstance
      .request({
        method: 'GET',
        url: `struct/${this.name}/list`,
      })
      .then(extractResponseData);
  }


  /**
   *
   * @return {Promise}
   */
  metainfo() {
    return axiosInstance
      .request({
        method: 'GET',
        url: `struct/${this.name}/metainfo`,
      })
      .then(extractResponseData);
  }
}


/**
 * @extends {Endpoint}
 */
class Structure extends Endpoint {
  constructor(name) {
    super();

    /**
     * @type {string}
     */
    this.name = name;
  }
}


class ApiClient {
  /**
   *
   * @type {AxiosRequestConfig}
   */
  defaults = axiosInstance.defaults;

  /**
   * Create structure bound endpoint.
   * todo: remove eslint-disable-next-line
   * @param {string} name
   * @return {Structure}
   */
  // eslint-disable-next-line class-methods-use-this
  structure(name) {
    return new Structure(name);
  }

  /**
   * Apply OR operator from api.
   * todo: remove eslint-disable-next-line
   * @param {Array} filters
   * @return {[*]}
   */
  // eslint-disable-next-line class-methods-use-this
  decorateWithOrOperator(filters) {
    return [{
      value: '',
      field: '',
      exp: '',
      operator: 'OR',
      filters,
    }];
  }
}


export default new ApiClient();
