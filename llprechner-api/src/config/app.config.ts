import convict from 'convict'
import dotenv from 'dotenv'
import { resolve } from 'path'
import convict_format_with_validator from 'convict-format-with-validator'
type NodeEnv = 'development' | 'production' | 'test' | 'staging'

/**
 * Load environment variables
 */
dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' })

// Add all formats
convict.addFormats(convict_format_with_validator)

/**
 * Configure error stack trace limit
 */
Error.stackTraceLimit = 10

const configSchema = convict({
  /**
     * Server config
     */
  env: {
    doc: 'Application environment',
    format: ['development', 'production', 'test', 'staging'],
    env: 'NODE_ENV',
    default: 'development' as NodeEnv
  },
  port: {
    doc: 'Server port',
    format: 'port',
    env: 'SERVER_PORT',
    default: 8080
  },

  /**
     * Environment config
     */
  debug: {
    doc: 'Debug mode',
    format: Boolean,
    env: 'DEBUG',
    default: false
  },
  publicHost: {
    doc: 'Public host of the server',
    format: 'url',
    env: 'SERVER_PUBLIC_HOST',
    default: 'http://localhost:8080'
  },
  version: {
    doc: 'Package version',
    format: String,
    env: 'npm_package_version',
    default: ''
  },

  /**
     * Application config
     */
  logsDir: {
    doc: 'Application logs directory',
    format: String,
    default: resolve(process.cwd(), './logs')
  }
})

// Validate current config
configSchema.validate({ allowed: 'strict' })

export const config = configSchema.getProperties()

export type Config = typeof config
