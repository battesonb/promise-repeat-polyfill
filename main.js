function appendRepeat(Promise) {
  Promise.repeat = function(promise) {
		let iteration = 1;
		let chainedPromise = new Promise((resolve, reject) => resolve(iteration++);
		let results = [];

		let handleIteration = result => {
			if (result == undefined) return results;

			results.push(result);
			iteration++;
			chainedPromise.then(handleIteration);
		}
	
		return chainedPromise.then(handleIteration);
  }
}

if (Promise) {
  appendRepeat(Promise);
}
