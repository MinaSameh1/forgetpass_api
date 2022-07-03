import pino from 'pino'
import config from 'config'

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      ignore: 'pid,hostname',
      translateTime: 'SYS:standard'
    }
  }
})

logger.level = config.get<string>('loggingLevel')

export default logger
