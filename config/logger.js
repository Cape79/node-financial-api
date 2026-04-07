const pino = require("pino");
const config = require("./index");

const logger = pino({
  level: config.nodeEnv === "production" ? "info" : "debug",
});

module.exports = logger;