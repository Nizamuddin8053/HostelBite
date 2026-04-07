module.exports = {
  plugins: [
    require("postcss-nesting"), //  MUST be first
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};