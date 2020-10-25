# `Les coqs soccer application`

Lite social network to share articles, videos, and fun between friends. Contains a calendar to organise events, a "vote" feature and different small games...

Build with angular 1.5, ES6 and Webpack.

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/).
* MongoDB - Download and Install [MongoDB](http://docs.mongodb.org/manual/installation/) - Make sure `mongod` is running on the default port (27017).

### Tools Prerequisites
* NPM - Node.js package manage; should be installed when you install node.js.

## Additional Packages
* Express - Defined as npm module in the [package.json](package.json) file.
* Mongoose - Defined as npm module in the [package.json](package.json) file.
* Passport - Defined as npm module in the [package.json](package.json) file.
* AngularJS - Defined as npm module in the [package.json](package.json) file.
* [Bulma css framework](http://bulma.io/)

This webpack configuration has several predefined loaders:
* [babel-loader](https://github.com/babel/babel-loader) for *.es6.js files
* [html-loader](https://github.com/webpack/html-loader) for *.html files
* [css-loader](https://github.com/webpack/css-loader) for *.css files
* [file-loader](https://github.com/webpack/file-loader) and [image-loader](https://github.com/novoda/image-loader) for *.jpeg, *.png, *.gif and *.svg files
* [postcss-loader](https://github.com/postcss/postcss-loader) for css postprocessing (autoprefixer + csswring)

### installation

Clone the repo:

```bash
$ git clone git@github.com:alexrosepizant/lcs-app.git lcs-app
$ cd lcs-app
```

Install dependencies:

```bash
$ npm install
```

Install webpack globally
```bash
$ npm install -g webpack
```

### development

Run server with:

```bash
$ npm start
```

### production

Build application with:

```bash
$ npm run build:prod
```

and run it with:

```bash
$ npm run server:prod
```

It runs express server on localhost on port 3000 and webpack-dev-server on port 3001 with proxing requests from the first one to the second one.

Application has two separate directory `src` and `server`. The entry point for frontend is `src/app/app.js` file and for backend it is `server/server.js`.

### Have fun!

## License
MIT
