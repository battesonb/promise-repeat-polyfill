# Promise Repeat Polyfill

[![Build Status](https://travis-ci.org/battesonb/promise-repeat-polyfill.svg?branch=master)](https://travis-ci.org/battesonb/promise-repeat-polyfill)

Lightweight Promise polyfill for a sequential repeat method.

I know this is not a true polyfill, but this is a method I would love to see added to the default Promise implementation.

## Node.js
`npm install promise-repeat-polyfill`

## Testing
* `npm install` to install testing framework
* `npm test` to run tests

## API
The latest API can be found on the [GitHub Wiki](https://github.com/battesonb/promise-repeat-polyfill/wiki).

## Usage
Simply import the library, that's it! As long as a Promise is found in the global namespace, the method as added to the Promise class.

`import 'promise-repeat-polyfill'`;

or

`require('promise-repeat-polyfill');


## Example
Not the most practical example, but it demonstrates wanting a "bulk" of data divided into smaller requests.

```
require('promise-repeat-polyfill');

const callback = (i) => {
  return fetch(`https://example/foo/${i}`);	
};

Promise.repeat(callback)
  .then(res => {
    console.log(res);
  });
```
