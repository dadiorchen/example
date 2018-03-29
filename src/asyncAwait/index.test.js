function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  var result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: "resolved"
}



it('testAsyncAwait',done => {
	//NOTE below code will fail because the asyncCall return a promise.resolve , so , that MEANS, the async function return a promise 
	//aysncCall()
	//SO, maybe the async/await syntax maybe get a little sample for code, in the future, if I meet some case which is hard to code because the promise/async syntax, I can consider about async/await
	asyncCall()
	.then(() => {
		done()
	})
})
