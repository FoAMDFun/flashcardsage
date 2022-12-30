import winston from "winston";
import path from "path";
import moment from "moment";

const timestampFormat = () => moment().format("YYYY-MM-DD HH:mm:ss.SSS");
const MESSAGE = Symbol.for("message");

const jsonFormatter = (logEntry: any) => {
  const base = { timestamp: new Date() };
  const json = Object.assign(base, logEntry);
  logEntry[MESSAGE] = JSON.stringify(json);
  return logEntry;
};
const options = {
  console: {
    level: "debug",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      winston.format.simple()
    ),
  },
  file: {
    level: "info",
    filename: path.join(process.cwd(), "logs", "app.log"), // from root dir to logs dir
    format: winston.format(jsonFormatter)(),
  },
};

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(options.console),
    new winston.transports.File(options.file),
  ],
  exitOnError: false,
});

export default logger;
