/* To demo the function in javascript */

describe('TestFunction',() => {
	it('TestNamedFunction',() => {
		const a		= {
			test	: function(){
				console.log('This is test')
				console.log('This is test')
				throw new Error('This is exception')
			},
			/* Using function with name  is useful 
			 * when print the error stack, the testBImplementation will be printed 
			 * */
			testB	: function testBImplementation(){
				console.log('This is test b')
				console.log('This is test b')
				throw new Error('This is exception b')
			},
		}

		try{
			a.test()

		}catch(e){
			console.warn(e)
		}

		try{
			a.testB()
		}catch(e){
			console.warn(e)
		}
	})

	/* Demo IIFE,Immediately invoke able  function express */
	it('TestIIFE',() => {
		(function(){
			console.log('This is IIFE')
			console.log('This is IIFE')
			console.log('This is IIFE')
			console.log('This is IIFE')
			console.log('This is IIFE')
		})()
	})

	it('TestRecursive',() => {
		const tree	= {
			name	: 'a',
			children	: [{
				name	: 'b'
			},{
				name	: 'c',
				children	: [{
					name	: 'd'
				},{
					name	: 'e'
				}],
			}],
		}
		console.log(tree)


		/* recursive */
		function recursive(node){
			console.log('element:',node.name)
			if(node.children){
				node.children.forEach(n => recursive(n))
			}
		}
		recursive(tree)
	})

	it('TestAugument',() => {
		function doSomething(){
			for(let i = 0 ; i < arguments.length ; i++){
				console.log('arguments:',arguments[i])
			}
		}
		
		doSomething(1)
		doSomething(1,2)
		doSomething(1,2,3)
	})

	it('TestDefaultArgument',() => {
		function doSomething(a	= 1){
			console.log('a:',a)
		}

		doSomething(100)
		doSomething()
	})

	it('TestThis',() => {
		const test	= {
			name	: 'tag',
			getName	: function(){
				return this.name
			},
			setName(name){
				this.name	= name
			}
		}

		console.log('name:',test.getName())
		test.setName('tagB')
		console.log('name:',test.getName())


		function returnThis(){
			return this
		}

		console.log('return this:',returnThis())
		expect(returnThis()).toBeUndefined()

		var a	= 'global'
		var obj	= {
			a	: 'custom',
		}

		function whatsThis(){
			return this.a
		}
		
		console.log('a:',whatsThis.call(obj))

		function findThis(){
			console.log('in find this:',this)
			const inThis = () => {
				console.log('in this :',this)
			}
			inThis()
			return inThis
		}

		let outThis		= findThis()
		outThis()

		let o	= {
			oThis	: findThis
		}

		let outThisB	= o.oThis()
		outThisB()
	})

	it('TestFunction',() => {
		function test() {
			console.log('test')
		}
		test()

		console.log('constructor of test:',test.constructor)
		console.log('constructor of test === Function:',test.constructor  === Function)


		function testB(a,b,c) {
			console.log('testB',a,b,c)
		}
		console.log('testB.name:',testB.name,'length:',testB.length)

		/* The function.name property */
		const object	= {
			name	: 'object',
			test	: testB,
			testC	: function(){
			}
		}
		console.log('object.name:',object.name,'object.test:',object.test.name,'testC:',object.testC.name)

		function e(){
			console.log('e!')
		}

		e()
		e.type		= 'someType'
		console.log('e:',e)
		console.log('e.type:',e.type)

	})

	it('TestApply',() => {
		function a(b,c){
			console.log('this is a with :',b,c)
			console.log('this is :',this)
		}
		
		a(1,2)
		a.apply(undefined,[1,2])

		var o	= {
			a,
		}
		o.a(3,4)
		o.a.apply(undefined,[3,4])


		console.log('max:',Math.max(1,2,3,5,2,1,2))
		console.log('max:',Math.max.apply(undefined,[1,2,3,5,2,1,2]))
	})

	it('TestBind',() => {
		const o		= {
			name	: 'logger',
			getName(){
				return this.name
			}
		}
		
		console.log('o.name:',o.getName())

		const getName	= o.getName.bind(o)

		console.log('get name:',getName())


		function getNameSingle(){
			return this && this.name
		}

		console.log('getName():',getNameSingle())

		const b		= {
			name	: 'newLoggger',
		}

		b.getName	= getNameSingle

		console.log('b.getName():',b.getName())


		function log(label,message){
			console.log(label,':',message)
		}

		log('TestBind','This is a message')

		const logB	= log.bind(null,'logB')

		logB('This is a message')
		
		console.log([1,2,3,4].slice(2))
		console.log(Array.prototype.slice.apply([1,2,3,4],[2]))
		console.log(Array.prototype.slice.apply([1,2,3,4]))
		const arrayConvert	= Array.prototype.slice
		console.log('array convert:',arrayConvert.apply([1,2,3,4]))
		const arrayConvertB	= Function.prototype.apply.bind(Array.prototype.slice)
		console.log('array convert b:',arrayConvertB([1,2,3,4]))


		console.log('concat : ',[1,2,3].join(','))
		console.log('concat :',Array.prototype.join.apply([1,2,3],[',']))
		console.log('concat :',Array.prototype.join.bind([1,2,3],[','])())
		
	})

	it('TestCall',() => {
		function myLog(...args){
			console.log('%s:' + args[0],'TestCall -> myLog',args.slice(1))
		}

		myLog.call(null,'This is a log with:%s',100)
	})

	it('TestToString',() => {
		console.log('ToString:',
		function my(a,b){
			console.log('a:',a,'b:',b)
		}.toString()
		)
	})

	it('TestAuguments',() => {
		function join(){
			return [...arguments].join(',')
		}
		console.log('join:',join(1,2,3,'s'))
	})

	it('TestArrow',() => {
		const arrowA	= () => true
		console.log('arrowA:',arrowA())

		const arrowB	= (a,b) => a + b
		console.log('arrowB:',arrowB(1,2))

		const arrowC	= a => a*a*a
		console.log('arrowC:',arrowC(2))

		const arrowD	= (a,b) => ({name : a,date : b})
		console.log('arrowD:',arrowD(1,2))
		
		const arrowE	= (...p) => p.join('|')
		console.log('arrowE:',arrowE(1,2,3))
	})

	it('TestObjectFunction',() => {
		const o		= {
			a	: function(){
				console.log('a')
			},
			b(){
				console.log('b')
			},
			['c'](){
				console.log('c')
			},
		}

		o.a()
		o.b()
		o.c()
	})

	it('TestDestructuring',() => {
		let [a,b,...array]		= [1,2,3,4,5]
		console.log('a:',a,'b:',b,'array:',array)

		{
			let {a,b,...object}		= {
				a	: 1,
				b	: 2,
				c	: 3,
				d	: 4,
			}
			console.log('a:',a,'b:',b,'object:',object)

			/* Rename the variable */
			let {a : A,b : B, c : C = 'ccccc'}		= {
				b		: 'bbbbb',
				a		: 'aaaaa',
			}
			console.log('A:',A,'B:',B,'C:',C,'a:',a)
		}


		function returnArray(){
			return [1,2]
		}

		let [e,f]	= returnArray()
		console.log('e:',e,'f:',f)


	})

	it.only('T',() => {
		console.log(Proxy)
	})
	
})



