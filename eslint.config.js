import antfu from '@antfu/eslint-config'

export default antfu({

}, {
  rules: {
    'style/jsx-one-expression-per-line': 'off',
    'style/max-statements-per-line': 'off',
  },
})
