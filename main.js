function appendRepeat(Promise) {
  Promise.repeat = function(callback) {
		let iteration = 0;
		let chainedPromise = callback(iteration++);
		let results = [];

		let handleIteration = result => {
			if (result == undefined) return results;

			results.push(result);
			return callback(iteration++).then(handleIteration);
		}
	
		return chainedPromise.then(handleIteration);
  }
}

if (Promise) {
  appendRepeat(Promise);
}