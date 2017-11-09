const directual = require('../../lib');


directual.api.defaults.baseURL = 'https://directual.com/good/api/v3';
directual.api.defaults.params = {
  appID: 'xxxxx',
  appSecret: 'xxxxx',
};

directual.api
  .structure('cars')
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
