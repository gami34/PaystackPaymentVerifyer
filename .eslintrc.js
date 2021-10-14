module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["standard", "plugin:prettier/recommended"],
  plugins: ["prettier", "jest"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    // Add here all the extra rules based on the developer preferences
  },
};
