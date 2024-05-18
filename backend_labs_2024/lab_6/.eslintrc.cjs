module.exports = {
    extends: ['semistandard', 'standard'],
    rules: {
      'space-before-function-paren': [
        'error',
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always'
        }
      ],
      'camelcase': ['error', { 'properties': 'never', 'ignoreDestructuring': true, 'allow': ['detail_ID', 'procType_ID'] }],
      'new-cap': 'off'
    }
  };
  