# ngServiceNow


```
// ecosystem.config.js 

module.exports = {
    apps : [{
      name: "ngServiceNow",
      script: "./server/index.js",
      env: {
        NODE_ENV: "development",
        PORT:"3000",
        SN_HOST:"<servicenow host name>",
        SN_PATH:"<servicenow url string>",
        SN_USER:"<username>",
        SN_PASS:"<password>"
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }
```