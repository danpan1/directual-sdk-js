import utils from '../utils';
import { checkStatus, parseJSON } from '../net';
import config from './config';


// Example
// directual.api
//   .structure('agreement_status)
//   .list({ ... })
//   .then();

/**
 *
 * @enum {string}
 */
const VerbType = {
  GET: 'GET',
  POST: 'POST',
};


/**
 *
 * @enum {string}
 */
const ApiMethod = {
  SAVE: '',
  LIST: 'list',
  SEARCH: 'search',
  META_INFO: 'metainfo',
};


const EndpointVerb = {
  [ApiMethod.SAVE]: VerbType.POST,
  [ApiMethod.LIST]: VerbType.GET,
  [ApiMethod.SEARCH]: VerbType.POST,
  [ApiMethod.META_INFO]: VerbType.GET,
};


/**
 *
 * @enum {string}
 */
const EndpointType = {
  STRUCTURE: 'structure',
};


const EndpointTypeToLocationPartMap = {
  [EndpointType.STRUCTURE]: 'struct',
};


class Endpoint {
  constructor() {
    this.type = null;
    this.name = null;
  }


  /**
   *
   * @param {Object} settings
   * @param {ApiMethod} settings.apiMethod
   * @param {Object=} settings.body
   * @param {boolean=} settings.isSync
   * @param {string=} settings.scenarioName
   * @param {string=} settings.fields
   * @return {Promise}
   */
  fetch(settings) {
    const {
      apiMethod,
      body,
      isSync,
      scenarioName,
      fields,
    } = settings;

    const endpointLocationPart = EndpointTypeToLocationPartMap[this.type];
    const location = `${config.API_PATH}/${endpointLocationPart}/${this.name}/${apiMethod}`;
    let query = '';

    if (isSync) {
      query = `?sync=true&pilotSysNames=${scenarioName}`;

      if (fields) {
        query += `&fields=${fields}`;
      }
    }

    const url = `${location}${query}`;
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

    if (!EndpointVerb[apiMethod]) {
      throw Error('Maybe you forget specify METHOD in EndpointVerb');
    }

    const options = {
      method: EndpointVerb[apiMethod],
      headers: {},
    };

    // todo: create utils.isNotEmptyObject()
    if (utils.isNotEmpty(body)) {
      options.body = JSON.stringify(body);
      options.headers['Content-Type'] = 'application/json';
    }

    return window
      .fetch(url, options)
      .then(checkStatus)
      .then(parseJSON)
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  /**
   *
   * @param {Object} body
   * @return {Promise}
   */
  save(body) {
    return this.fetch({
      apiMethod: ApiMethod.SAVE,
      body,
    });
  }

  /**
   *
   * @param {string} scenarioName
   * @param {Object} body
   * @param {string} fields Fields that will be returned.
   * @return {Promise}
   */
  saveSync(scenarioName, body, fields) {
    return this.fetch({
      apiMethod: ApiMethod.SAVE,
      body,
      isSync: true,
      scenarioName,
      fields,
    });
  }


  /**
   *
   * @param {Object=} body
   * @return {Promise}
   */
  list(body) {
    return this.fetch({
      apiMethod: ApiMethod.LIST,
      body,
    });
  }


  /**
   *
   * @param {Object} body
   * @return {Promise}
   */
  search(body) {
    return this.fetch({
      apiMethod: ApiMethod.SEARCH,
      body,
    });
  }


  /**
   *
   * @return {Promise}
   */
  metainfo() {
    return this.fetch({
      apiMethod: ApiMethod.META_INFO,
    });
  }
}


/**
 * @extends {Endpoint}
 */
class Structure extends Endpoint {
  constructor(name) {
    super();

    /**
     * @type {EndpointType}
     */
    this.type = EndpointType.STRUCTURE;

    /**
     * @type {string}
     */
    this.name = name;
  }
}


class ApiClient {
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
