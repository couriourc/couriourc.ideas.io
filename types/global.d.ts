declare interface LogClass {
  log(...message: any[]): any[]

  info(...message: any[]): any[]

  warn(...warnMessage: any[]): any[]

  error(...errorMessage: any[]): any[]
}

interface Window {
  logger: LogClass
}
