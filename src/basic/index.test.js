
test('if: test if statement',done => {
	//{{{
	let x = 1
	/* demo : basic if condition */
	if( x === 1){
	}else{
		done.fail()
	}
	/* demo : if condition is assignment */
	let y = 1
	if((x = y)){
		//go here, because x = y return 1
	}else{
		done.fail()
	}
	y = 0 
	if((x = y )){
		done.fail()
	}else{
		//go here , because x = y return 0
	}
	done()
	//}}}
})

/* TODO */
test('async: test async function',() => {
	//{{{
	console.warn('TODO')
	//}}}
})


/* block */
test('block: test block and variable',done => {
	//{{{
	/* var go through the block, var variable do not have block scope */
	var x = 1
	if(true){
		var x = 2
	}
	expect(x).toBe(2)
	console.log('x=%s',x)

	/* let just effect the block */
	let y = 1
	if(true){
		let y = 2
	}
	expect(y).toBe(1)
	console.log('y=%s',y)

	/* function for block */
	function foo(){
		console.log('foo is called ')
	}
	{
		function bar(){
			console.log('bar is called')
		}
	}
	foo()
	expect(() => {
		bar()
	}).toThrow()

	done()
	//}}}
})


test('const: const variable ',done =>{
	//{{{
	/* declare more then one const at a time */
	const a = 7,
		b = 8
	console.log('const : a = %s , b = %s',a,b)
	done()
	//}}}
})

test('do-while: loop ',done => {
	//{{{
	//limit loop time to 5
	let i = 0
	do{
		console.log('loop in time:%d',i)
	}while(++i < 5)
	done()
	//}}}
})


