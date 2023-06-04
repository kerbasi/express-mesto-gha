module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "airbnb-base",
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    allow: ["_id"],
  },
};
