function appendRepeat(Promise) {
  Promise.repeat = function(promise) {
		let iteration = 0;
		let chainedPromise = promise(iteration++);
		let results = [];

		let handleIteration = result => {
			if (result == undefined) return results;

			results.push(result);
			return promise(iteration++).then(handleIteration);
		}
	
		return chainedPromise.then(handleIteration);
  }
}

if (Promise) {
  appendRepeat(Promise);
}
