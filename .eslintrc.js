module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'env': {
    'browser': true,
    'jest': true
  },
  'rules': {
    'valid-jsdoc': [2, {
      requireParamDescription: false,
      requireReturnDescription: false,
      requireReturn: false,
      prefer: { returns: 'return' },
    }],
    // Because backend api use underscore in own json.
    'camelcase': 'off',

    // 2 new lines from google closure standard.
    'import/newline-after-import': ['error', { 'count': 2 }],

    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prefer-stateless-function': 'off',

    'jsx-a11y/label-has-for': 'off',
  }
};
