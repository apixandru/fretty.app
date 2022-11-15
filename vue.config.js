module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/fretty.app/" : "/",
  configureWebpack: {
    entry: {
      index: "./src/main.js",
      test: "./src/main.js",
    },
  },
};
