/* How Node.js is different from vanilla js */
//1)Node runs on a server - not in a browser (backed not frontend)
//2)The console is the terminal window
//3)global object instead of window object
//console.log(global)
//4)Has common core modules that we will explore
//5)CommonJS modules instead of ES6 modules
//6)Missing some JS APISs like fetch

type of middleware
//1. Application-level middleware
//2. Router-level middleware
//3. Build-in middleware
//4. Error-handling middleware
//5. Third-party middleware
//https://github.com/gitdagray/node_js_resources



//Generate Secret key 
require('crypto').randomBytes(64).toString('hex')