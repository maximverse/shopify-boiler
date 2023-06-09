import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV;
let logger = null;

// Intetionally checking for development instead of production
// By default we want to fallback to the prod logger if no node_env is set
// Better to have useless logs than logs we need but don't have

// Making switch statement to leave door open to different env loggers

switch (env) {
  case "development":
    const devLoggerModule = await import("./devLogger.js");// This dynamic import makes it so you don't require a logtail source token until you deploy to production
    logger = devLoggerModule.default
    break;
  default:
    const prodLoggerModule = await import("./prodLogger.js")
    logger = prodLoggerModule.default;
    break;
}

// LOG LEVELS
// error
// warn
// info
// http
// verbose
// debug
// silly

// EXAMPLES

// logger.silly('silly billy')
// logger.verbose('very verbose yes')
// logger.debug('my super cool debug')
// logger.info('my super cool info')
// logger.warn('my super cool warning')
// logger.error('my super cool error', {someError: 'hey this is some error data'})

export default logger;