declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TWITTER_CUSTOMER_ID: string
      NODE_ENV: 'development' | 'production'
      TWITTER_CUSTOMER_SECRET: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
