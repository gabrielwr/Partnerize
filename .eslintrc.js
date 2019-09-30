module.exports = {
  plugins: ['prettier'],

  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'all', // none, es5, all
        bracketSpacing: true,
        jsxBracketSameLine: false
      }
    ]
  }
};
