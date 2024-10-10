const { i18n } = require("./next-i18next.config.js");

module.exports = {
  //...
  i18n,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["3.232.124.157", "https://koncierge-five.vercel.app"],
  },
};
