# Project Name

This project is a clone of the Steam game page, which includes
- Navbar/sidebar
- Game media gallery
- Purchase/update information
- Review submission
- Viewing reviews for a game

## Related Projects

  - Eric: https://github.com/parks-and-recursion/steam_reviews
  - Joyce: https://github.com/parks-and-recursion/steam_addReviewsandModals
  - Jimmy: https://github.com/parks-and-recursion/steam_navbar_sidebar
  - Xin: https://github.com/parks-and-recursion/steam_content
  - Graham: https://github.com/parks-and-recursion/steam_recentNews

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

#### Webpack
```javascript
var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/public');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',      
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader'
      }
    ],
  }
};
```

#### package.json
```json
{
  "name": "steam_clone",
  "version": "",
  "description": "",
  "author": "",
  "license": "",
  "engines": {
    "node": ">=6.13.0"
  },
  "jest": {
    "setupFiles": [
      "./jest.setup.js"
    ],
    "snapshotSerializers": [
      "enzyme-to-json/serializer"
    ]
  },
  "scripts": {
    "start": "nodemon server/index.js",
    "react-dev": "webpack -d --watch",
    "seed": "node seed.js",
    "test": "./node_modules/.bin/jest test"
  },
  "dependencies": {
    "axios": "^0.18.0",
    "body-parser": "^1.19.0",
    "express": "^4.15.0",
    "faker": "^4.1.0",
    "jquery": "^3.1.1",
    "moment": "^2.24.0",
    "mysql": "^2.13.0",
    "mysql2": "^1.6.5",
    "nodemon": "^1.19.0",
    "react": "^15.4.2",
    "react-dom": "^15.4.2",
    "sequelize": "^5.8.6",
    "styled-components": "^3.4.10"
  },
  "devDependencies": {
    "@babel/core": "^7.0.0",
    "@babel/preset-env": "^7.4.4",
    "@babel/preset-react": "^7.0.0",
    "babel-core": "^6.23.1",
    "babel-jest": "^24.8.0",
    "babel-loader": "^6.3.2",
    "babel-preset-es2015": "^6.22.0",
    "babel-preset-react": "^6.23.0",
    "css-loader": "^2.1.1",
    "enzyme": "^3.9.0",
    "enzyme-adapter-react-15": "^1.4.0",
    "enzyme-adapter-react-15.4": "^1.4.0",
    "enzyme-to-json": "^3.3.5",
    "eslint-config-hackreactor": "git://github.com/reactorcore/eslint-config-hackreactor",
    "file-loader": "^3.0.1",
    "jest": "^24.8.0",
    "jest-styled-components": "^6.3.1",
    "react-addons-test-utils": "^15.6.2",
    "react-test-renderer": "^16.8.6",
    "style-loader": "^0.23.1",
    "url-loader": "^1.1.2",
    "webpack": "^2.2.1"
  }
}

```