GenDocAPI
=========

App that generates docs for API using YAML & Gulp

Install node modules:

```
$ npm install
```

How to create documentation
----------------

1. Create file with *.yml extension in `/src/yaml`
2. Type your documentation
3. Add name of your file to array "files" in `/src/js/app.js`
4. Compile using command

```
$ gulp
```

YAML Structure
----------------

Documentation is written in yaml within structure below.
Loop for items separeted with 2 spaces

```
chapter: Users // Name of group for collections
collections: // Each collection should be separated with empty line (for easy-read purpose)

- type: get // Type of http method
  url: /users // Url for method
  descTitle: Get all users // Short description for method
  descMain: Hello // Long description for method 
  parameters: // Can be null if GET, in other case just like response
  response: // Can be null
  - parameter: name // Parameter send to server
    data: string // Data type of parameter
    desc: Name of user // Description of parameter
    type: query // Type of parameter
  - parameter: last_name
    data: string
    desc: Last name of user
    type: query
  messages: // Response messages from server
  - status: 200 // Status of message
    desc: Success // Message
  - status: 204
    desc: No users found
```
