# RESTful API challenge
> RESTful API challenge using Express and MongoDB

# Start Application
[Node.js](https://nodejs.org/) is required

```bash
npm test # test using mocha
npm run dev # run the API in development mode
npm start # run the API in production mode
npm run apidoc # generate API docs
```
First, you will need to install and run [MongoDB](https://www.mongodb.com/) in another terminal instance.

```bash
$ mongod
```

Then, run the server in development mode.

```bash
$ npm run dev
Express server listening on http://localhost:3000, in development mode
```

## Generate Mocks data
Please execute the command in this order
```bash
npm run fakeproducts # generate fake products
npm run fakeimages # generate fake images
npm run fakecolor # generate fake color
npm run fakeitems # generate fake items
```
