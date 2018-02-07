function appendRepeat(Promise) {
  Promise.repeat = function(callback) {
    return new Promise((resolve, reject) => {
			let iteration = 0;
	  	const responses = [];
      const recurse = () => {
        callback(iteration++)
          .then(response => {
            if(response) {
			  			responses.push(response);
              return recurse(callback);
            }
        		resolve(responses); 
          })
          .catch(err => reject(err));
      };
      return recurse();
    });
  }
}

if(Promise) {
  appendRepeat(Promise);
}
