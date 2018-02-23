This is the proposed API for the repeat method as of version 2.x of this npm package.

#### `Promise.repeat`
Repeats the callback/action given to it, which returns a resolved Promise on completion. If the result of this promise returns a value which is `undefined`, the repeat method ends by returning an array of all the responses. If any of the callbacks return a rejected promise, method execution ends and the Promise returned by repeat is rejected.

params
* `callback: Promise<object>` A promise which returns any JavaScript object, primitive or otherwise.

returns
* `Promise<object[]>`