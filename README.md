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

## ServiceNow Notes

Example of sending REST API call within a ServiceNow Widget. 
- ServiceNow will automatically authenicate you 
- You then, retrieve your user token via Server Script
- Pass the token to the header of your Client Side AJAX request within the `X-User-Token` header

> HTML Template
```html
<div>
<!-- your widget template -->
  <h1>
    User Session Token
  </h1>
  <p><b>Session ID:</b> {{ sessionID }} </p>
  <p><b>User Name:</b> {{ userName }} </p>
  <p><b>X-User-Token:</b> {{ token }} </p>
  
  <button class="btn btn-primary" 
          ng-click="send()">
    Send
  </button>
  
    <table>
            <thead>
                <th>Task Number</th>
                <th>Key</th>
                <th>State</th>
                <th>Updated By</th>
                <th>Updated</th>
            </thead>
            <tbody>
                <tr ng-repeat="item in data">
                    <td>{{ item.number }}</td>
                    <td>{{ item.key }}</td>
                    <td>{{ item.state }}</td>
                    <td>{{ item.sys_updated_by }}</td>
                    <td>{{ item.sys_updated_on }}</td>
                </tr>
            </tbody>
        </table>
        <pre>{{ errorMsg }} </pre>
  
  
  
</div>
```

> Client Script
```javascript
function($scope, $http) {

  /* Server Side Variables */
  var c = this;
	$scope.sessionID = $scope.c.data.sessionID;
	$scope.userName = $scope.c.data.userName;
	$scope.token = $scope.c.data.token;
  $scope.url = $scope.c.data.url;
	
	/* Client Side Variable */
	$scope.data = [];
	$scope.errorMsg = '';
	$scope.headers = {
		'X-User-Token': $scope.token
	}
	$scope.options = {
		method:'GET',
		url: $scope.url,
		headers: $scope.headers
	}
	
	$scope.send = function(){
		
		$http($scope.options).then(function successCb(response) {

			$scope.data = [];
			$scope.errorMsg = 'No Error(s) Found';

			console.log('Sending Request ...');
			if (response.status === 200 && response.data && response.data.result) {
				console.log(response.status);
				$scope.data = response.data.result;
			}
		}, function errorCb(response) {
			console.log('Error Response:', response);
			$scope.errorMsg = 'Error Status: ' + response.status + ' : ' + response.data;
		});
	}

}
```

> Server Script
```javascript

(function() {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
	
	data.sessionID = gs.getSessionID();
	data.userName = gs.getUserName();
	data.token = gs.getSessionToken();
	data.url = "<servicenow url string>";  // ie. /api/now/table/<tablename>?sysparam_limit=1
	
})();

```