# ngServiceNow
This application uses a server to server connection from a Node.js server to a ServiceNow instance using the now REST API.

## Getting Started

- Install Dependencies
```
npm install -g pm2 typescript
npm install
```

### Configure Environment Variables
- Create a file named `ecosystem.config.js` one directory up from this current directory to avoid committing connection credentials to GitHub.

```
touch ./../ecosystem.config.js
```
 
 - Copy the following configuration into the file

```javascript

// ecosystem.config.js 

module.exports = {
    apps : [{
      name: "ngServiceNow",
      script: "./server/index.js",
      env: {
        NODE_ENV: "development",
        PORT:"3000",
        SN_HOST: "<servicenow host",         // ie. dev0000.service-now.com
        SN_PATH: "<servicenow url string>",  // ie. /api/now/table/<tablename>?sysparam_limit=1
        SN_USER: "<username>",               
        SN_PASS: "<password>"                
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }

```

## Start Application

```
npm start
```

> Then go to http://localhost:3000 in your browser.

## Stop Application
> Press Ctrl+C to end terminal
```
npm run stop
```
## Restart Application
> Press Ctrl+C to end terminal
```
npm run restart
```
 

## Script Documentation 

| Command                       | Description                                                                            |
| ----------------------------- | ---------------------------------------------------------------------------------------|
| `npm start`                   | Starts the application currently running typescript complier and pm2 server process. Both in watch mode.  |
| `npm run restart`             | Restarts the application by running `npm run stop` then `npm start` | 
| `npm run stop`                | Stops the pm2 server process | 
| `npm run monitor`             | Allows you to see the server logs and console while server is running.  For troubleshooting connection. |
| `npm run build:server`        | Compiles the typescript files in javascript and places them within `server/dist` directory |  
| `npm run build:server:watch`  | Watches for changes to typescript files and re-compiles into `server/dist` directory | 


> `Note:` Unfortunately, you will have to manually refresh the browser to see any changes made to the applicaiton while it is running.
