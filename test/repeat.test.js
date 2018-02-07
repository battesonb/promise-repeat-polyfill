const assert = require('assert');

require('../main.js');

const DURATION = 5;
const ERROR_MESSAGE = "Forced error";

/**
 * Create callbacks in order with the first ones taking longer than
 * the last ones. This makes testing sequence easier.
 * @param {number} count - The number of promises to returning before.
 * @param {boolean} error - Error on the first promise.
 * resolving the repeat.
 */
function getCallback(count, error) {
		return i => {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					if(i == 0 && error) reject(ERROR_MESSAGE);
					if(i < count) {
						resolve(i+1);
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

		it('should have a response array of size equal to the number of promises which return a truthy value.', () => {
			return Promise.repeat(getCallback(3))
				.then(res => {
					assert.equal(res.length, 3);
				});
		});

		it('should perform callbacks, which return Promises, in sequence', () => {
			return Promise.repeat(getCallback(3))
				.then(res => {
					assert.deepEqual([1, 2, 3], res);	
				});
		});	

		it('should stop execution on the first error encountered', () => {
			return Promise.repeat(getCallback(3, true))
				.then(res => {
					assert.fail("Should not complete");
				})
				.catch(err => {
					assert.equal(ERROR_MESSAGE, err);
				});
		});
	});
});
