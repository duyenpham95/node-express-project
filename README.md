### My first node-express-project

What i did: 

* Create the project
```
npm init --yes
```
* Installation
```
npm i express
```
* Create index.js and do development

How to start 
instead of: node index.js 
```
npx nodemon index.js
```
#### Tech note:
* config: for configuration with env variables
* Joi for schema validation
* nodemon to watch for changes in files and automatically restart the
node process
* Using Router to structure and clean code
* Using ES6 destructure object for cleaner code 
* Using middleware functions: 
- helmet: HTTP Response Header setting
- morgan: logging
* Debug which specific namespace for a module
