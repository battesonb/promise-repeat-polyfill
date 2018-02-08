const assert = require('assert');

require('../main.js');

const DURATION = 5;
const ERROR_MESSAGE = 'Forced error';

/**
 * Create a callback in order with the first call taking longer than
 * the last call. This makes testing sequence easier.
 * @param {number} count - The number of promises to returning before resolving.
 * @param {boolean} error - Error on the first promise.
 * @returns {Promise}
 */
function getCallback(count, error) {
	return i => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if(i == 0 && error) reject(ERROR_MESSAGE);
				if(i < count) {
					resolve(i);
					return;
				}
				resolve();
			}, (count - i) * DURATION);
		});
	};
}

/**
 * Create a callback which fails if the same callback is called while it
 * is running.
 * @param {number} count - The number of promises to return before resolving.
 * @returns {Promise}
 */
function getRunningCallback(count) {
	let running = false;
	return i => {
		return new Promise((resolve, reject) => {
			if(running) {
				reject();
				return;
			}
			running = true;
			setTimeout(() => {
				running = false;
				if(i < count) {
					resolve(i);
					return;
				}
				resolve();
			}, (count - i) * DURATION);
		});
	};
}

describe('Promise', () => {
	it('should exist', () => {
		const g = global || window;
		assert(Promise != null || Promise != undefined);
	});

	describe('#repeat()', () => {
		it('should exist', () => {
			assert(Promise.repeat != null || Promise.repeat != undefined);
		});	

		it('should have a response array of size equal to the number of promises which return a non-undefined value.', () => {
			return Promise.repeat(getCallback(3))
				.then(res => {
					assert.equal(res.length, 3);
				});
		});

		it('should perform callbacks, which return Promises, in sequence', () => {
			return Promise.repeat(getCallback(3))
				.then(res => {
					assert.deepEqual([0, 1, 2], res);	
				});
		});

		it('should not perform multiple iterations of the callback at the same time', () => {
			return Promise.repeat(getRunningCallback(3))
				.then(res => {
				  assert.deepEqual([0, 1, 2], res);	
				})
				.catch(err => {
					assert.fail('Callbacks ran at the same time');
				});
		});

		it('should stop execution on the first error encountered', () => {
			return Promise.repeat(getCallback(3, true))
				.then(res => {
					assert.fail('Should not complete');
				})
				.catch(err => {
					assert.equal(ERROR_MESSAGE, err);
				});
		});
	});
});
