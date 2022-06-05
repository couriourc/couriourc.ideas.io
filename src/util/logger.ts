/**
 * Handling error stack information
 * @param error
 */
export function processStackMsg(error: Error) {
  if (!error.stack) {
    return ''
  }
  let stack = error.stack
    .replace(/\n/gi, '') // Remove line breaks to save the size of the transmitted content
    .replace(/\bat\b/gi, '@') // At in chrome, @ in ff
    .split('@') // Split information with @
    .slice(0, 9) // The maximum stack length (Error.stackTraceLimit = 10), so only take the first 10
    .map((v) => v.replace(/^\s*|\s*$/g, '')) // Remove extra spaces
    .join('~') // Manually add separators for later display
    .replace(/\?[^:]+/gi, '') // Remove redundant parameters of js file links (?x=1 and the like)
  const msg = error.toString()
  if (stack.indexOf(msg) < 0) {
    stack = msg + '@' + stack
  }
  return stack
}

interface LogClass {
  log(...message: any[]): any[]

  info(...message: any[]): any[]

  warn(...warnMessage: any[]): any[]

  error(...errorMessage: any[]): any[]
}

enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR'
}

class Logger implements LogClass {
  log(...message: any[]): any[] {
    const { VITE_CONSOLE_LEVEL } = import.meta.env
    if (VITE_CONSOLE_LEVEL.indexOf(LogLevel.INFO) === -1) return message

    console.info(...message)

    return message
  }

  info(...message: any[]): any[] {
    const { VITE_CONSOLE_INFO_PREFIX, VITE_CONSOLE_LEVEL } = import.meta.env
    if (VITE_CONSOLE_LEVEL.indexOf(LogLevel.INFO) === -1) return message

    console.info(`${VITE_CONSOLE_INFO_PREFIX}`, ...message)
    return message
  }

  warn(...warnMessage: any[]): any[] {
    const { VITE_CONSOLE_WARN_PREFIX, VITE_CONSOLE_LEVEL } = import.meta.env
    if (VITE_CONSOLE_LEVEL.indexOf(LogLevel.WARN) === -1) return warnMessage

    console.warn(`${VITE_CONSOLE_WARN_PREFIX}`, ...warnMessage)
    return warnMessage
  }

  error(...errorMessage: any[]): any[] {
    const { VITE_CONSOLE_ERROR_PREFIX, VITE_CONSOLE_LEVEL } = import.meta.env
    if (VITE_CONSOLE_LEVEL.indexOf(LogLevel.ERROR) === -1) return errorMessage

    console.error(`${VITE_CONSOLE_ERROR_PREFIX}`, ...errorMessage)
    return errorMessage
  }
}

const LoggerInstance = new Logger()
if (window) {
  window.logger = LoggerInstance
}

export default LoggerInstance
