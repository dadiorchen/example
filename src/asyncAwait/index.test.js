function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 500);
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



/* To demo the 演示是否可以通过async的方式来封闭内部的一部调用,对于外部来说这是一个同步调用,这样比较爽,另外顺带演示一下异常的处理 */
/* 实验证明,不能彻底消除异步调用,最终还是会一直反映到最上层*/
it('TestInnerAsync',async () => {
	function someAsync(someThingWrong){
		return new Promise((resolve,reject) => {
			setTimeout(() => {
				if(someThingWrong){
					reject(new Error('reject by promise'))
				}
				console.log('OK,resolved!')
				resolve(true);
			}, 500);
		});
	}
	const asyncFunction = async (someThingWrong) => {
		var result = await someAsync(someThingWrong)
		return result
	}

	const functionToCallAsync = function(someThingWrong,badFormat){
		if(badFormat){
			throw new Error('bad format')
		}
		return asyncFunction(someThingWrong)
	}
	/* 必须是await,不然不能正确返回结果*/
	expect(await functionToCallAsync()).toBe(true)
	/* This line to throw a exception */
	/* Yes, this is a great way to catch the error,using async */
	try{
		await functionToCallAsync(true)
		expect(1).toBe(0)
	}catch(e){
		console.log('catch error:',e)
	}
	/* TODO why can not using toThrow */
	//expect(async () => {await functionToCallAsync(true)}).toThrow()
	
	/* Try to catch the error from async function (not the reject from promise) */
	/* This is GREAT, so , the try/catch with async is very 非常合理和好理解 */
	try{
		await functionToCallAsync(true,true)
		expect(1).toBe(0)
	}catch(e){
		console.log('catch error:',e)
	}
})
