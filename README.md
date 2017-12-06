# directual-sdk-js
Directual SDK for JavaScript https://directual.com/

## Support
* Explorer 11
* Chrome 43+
* Node 8.9+

## Install
`npm install directual`

## Usage in Node
```js
const directual = require('directual');

directual.api.defaults.baseURL = 'https://directual.com/good/api/v3';
directual.api.defaults.params = {
  appID: 'xxxxx',
  appSecret: 'xxxxx',
};

directual.api
  .structure('xxxxx')
  .search({
    filters: [
      {
        field: 'id',
        value: 1,
        exp: '==',
      },
    ],
  })
  .then((response) => {
    console.log(response.result.list);
  });
  ```
