import fs from 'fs';
import path from 'path';

class Logger {
  constructor() {
    this.logDir = path.join(process.cwd(), 'logs');
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      message,
      ...meta
    };
    return JSON.stringify(logEntry);
  }

  writeToFile(filename, message) {
    if (process.env.NODE_ENV === 'production') {
      const logFile = path.join(this.logDir, filename);
      fs.appendFileSync(logFile, message + '\n');
    }
  }

  info(message, meta = {}) {
    const formattedMessage = this.formatMessage('info', message, meta);
    console.log(`ℹ️  ${formattedMessage}`);
    this.writeToFile('app.log', formattedMessage);
  }

  warn(message, meta = {}) {
    const formattedMessage = this.formatMessage('warn', message, meta);
    console.warn(`⚠️  ${formattedMessage}`);
    this.writeToFile('app.log', formattedMessage);
  }

  error(message, error = null, meta = {}) {
    const errorMeta = error ? {
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name
      },
      ...meta
    } : meta;

    const formattedMessage = this.formatMessage('error', message, errorMeta);
    console.error(`❌ ${formattedMessage}`);
    this.writeToFile('error.log', formattedMessage);
  }

  debug(message, meta = {}) {
    if (process.env.NODE_ENV === 'development') {
      const formattedMessage = this.formatMessage('debug', message, meta);
      console.debug(`🐛 ${formattedMessage}`);
    }
  }

  success(message, meta = {}) {
    const formattedMessage = this.formatMessage('success', message, meta);
    console.log(`✅ ${formattedMessage}`);
    this.writeToFile('app.log', formattedMessage);
  }

  logRequest(req, res, duration) {
    const logData = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      userId: req.user?.id || 'anonymous'
    };

    if (res.statusCode >= 400) {
      this.warn('HTTP Request Failed', logData);
    } else {
      this.info('HTTP Request', logData);
    }
  }
}

export const logger = new Logger();
export default logger;