module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-alert': 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'no-unused-vars': 'off',
    'no-prototype-builtins': 'off',
    //强制使用单引号
    quotes: ['error', 'single'],
    //强制不使用分号结尾
    semi: ['error', 'never'],
  },
  globals: {
    window: true,
    Fmap: true
  },
}
