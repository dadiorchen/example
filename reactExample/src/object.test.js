/* To demo the usage of Object class */


class A {

	printA(){
		console.log('Print A...')
	}
}

class B {

}

/* Demo , modify the original Object prototype
 * After this , the A & B have print function
 * */
Object.prototype.print		= function(){
	console.log('Print something ...')
}



describe('TestObject',() => {
	it('Test:',() => {
		const a 	= new A()
		console.log('The a 	constructor is:',a.constructor)
		console.log('The a 	constructor name is:',a.constructor.name)
		expect(a.constructor.name).toBe('A')
		const b		= new B()
		a.print()
		b.print()

		/* Demo
		 * The prototype is 类的原型
		 * The __proto__ is 对象的对类的原型的引用,所以它跟上面的那个类的原型是同一个东西
		 * */
		console.log('The a.__proto__:',a.__proto__)
		console.log('The A.prototype:',A.prototype)
		expect(A.prototype).toBe(a.__proto__)
		expect(B.prototype).not.toBe(a.__proto__)
	})


	it('TestNoSuchMethod',() => {
		var o = {
			__noSuchMethod__	: function(id,args){
				console.log(id,'(' + args.join(',') + ')')
			},
		}

		/* The node do not support it : __noSuchMethod__*/
		expect(() => {
			o.foo(1,2,3)
		}).toThrow()
	})

	it('TestHasOwnProperty',() => {
		class EP {
			constructor(){
				this.parentName	= 'EPObject'
			}

			parentPrint(){
				console.log('parent print')
			}
		}
		class E extends EP{
			constructor(){
				super()
				this.name	= 'EObject'
				this.thisPrint	= function(){
					console.log('this print')
				}
			}

			print(){
				console.log('print')
			}

			static staticPrint(){
				console.log('static print')
			}
		}

		/* So , the hasOwnProperty is checking the this , so : this.name ,this.parentName is true, and print,parentPrint is false!*/
		const e		= new E()
		console.log('e:',e)
		console.log('e.name:',e.name)
		console.log(e.hasOwnProperty('name'))
		expect(e.hasOwnProperty('name')).toBe(true)
		console.log(e.hasOwnProperty('parentName'))
		expect(e.hasOwnProperty('parentName')).toBe(true)

		e.print()
		e.parentPrint()
		console.log(e.hasOwnProperty('print'))
		expect(e.hasOwnProperty('print')).toBe(false)
		console.log(e.hasOwnProperty('parentPrint'))
		expect(e.hasOwnProperty('parentPrint')).toBe(false)


		/* Dome:
		 * This is to say:
		 * thisPrint		is property of this
		 * print			is property of E.prototype
		 * parentPrint		is property of E.__proto__.prototype
		 * staticPrint		is property of E
		 *
		 * */
		E.staticPrint()
		console.log(E.hasOwnProperty('print'))
		console.log(E.prototype.hasOwnProperty('print'))
		console.log(E.__proto__.prototype.hasOwnProperty('parentPrint'))
		console.log(E.hasOwnProperty('staticPrint'))

		expect(e.hasOwnProperty('thisPrint')).toBe(true)
		expect(E.hasOwnProperty('staticPrint')).toBe(true)
		expect(e.__proto__.constructor.hasOwnProperty('staticPrint')).toBe(true)
		expect(E.prototype.hasOwnProperty('print')).toBe(true)
		expect(e.__proto__.hasOwnProperty('print')).toBe(true)
		expect(E.__proto__.prototype.hasOwnProperty('parentPrint')).toBe(true)
		console.log('xxx:',e.__proto__.__proto__.hasOwnProperty('parentPrint'))
		expect(e.__proto__.__proto__.hasOwnProperty('parentPrint')).toBe(true)

	})


	it('TestIsPrototypeOfAndInstanceof',() => {
		class G {
		}

		class GG extends G {
		}

		class GGG extends GG{
		}

		const ggg		= new GGG()

		console.log('GG:',GG.prototype.isPrototypeOf(ggg))
		console.log('GG:',GGG.prototype.isPrototypeOf(ggg))
		console.log('GG:',G.prototype.isPrototypeOf(ggg))
		expect(G.prototype.isPrototypeOf(ggg)).toBe(true)
		expect(GG.prototype.isPrototypeOf(ggg)).toBe(true)
		expect(GGG.prototype.isPrototypeOf(ggg)).toBe(true)

		console.log('instance:',ggg instanceof G)
		console.log('instance:',ggg instanceof GG)
		console.log('instance:',ggg instanceof GGG)

		console.log('con:',GGG.prototype)
		console.log('3:',ggg.__proto__ === GGG.prototype)



		class H {
		}

		class J {
		}
		J.prototype	= new H() //equal to :  J.prototype = H.prototype

		const j	= new J()
		console.log('ccc:',j instanceof J)
		console.log('ccc:',j instanceof H)
		console.log('ddd:',j.__proto__)
		expect(j instanceof J).toBe(true)
		expect(j instanceof H).toBe(true)


	})

	it('TestToString',() => {
		class Hashtag {
			constructor(name){
				this.name	= name
				this.createdTime	= Date.now()
			}
		}

		const hashtag	= new Hashtag('logger')
		console.log('hashtag:',hashtag)
		console.log('hashtag:',hashtag.toString())
		Hashtag.prototype.toString		= function(){
			return `[hashtag:${this.name}]`
		}
		console.log('hashtag:',hashtag.toString())
	})

	it('TestAlertObject',() => {
		const a		= {
			number		: 100,
		}

		/* Demo the way to replace old function , but ,if the condition do not meet , 
		 * then use the old one
		 * */
		var oldOne	= Object.prototype.valueOf
		Object.prototype.valueOf	= function(){
			if(this.hasOwnProperty('number')){
				return this.number
			}else{
				return oldOne.apply(this,arguments)
			}
		}

		console.log('the value:',a + 1)
		expect(a+1).toBe(101)

		const b		= {
			nu		: 100,
		}
		console.log('the value:',b + 1)
	})

	it('TestAssign',() => {
		const a		= {
			a	: 1,
			b	: 2,
		}

		const c		= Object.assign(a,{b:3})
		console.log('c:',c)
		expect(c.b).toBe(3)
		expect(a.b).toBe(3)
	})

	/* This demo is to implement a react redux action bind, */
	it('TestBindAction',() => {
		class Model {
			constructor(){
				this.name	= 'userModel'
			}

			/* CAUTION : the variable is different from the function (like below test),
			 * It will be set to the instance object !
			 * */
			actions		= {
				update(){
					console.log('update action!')
					return {ok:'true'}
				}
			}

			test(){
				console.log('test')
			}
		}

		const model		= new Model()
		console.log('has own action:',model.hasOwnProperty('actions'))
		expect(model.hasOwnProperty('actions')).toBe(true) //!!! 

		console.log('has own action:',model.hasOwnProperty('test'))
		expect(model.hasOwnProperty('test')).toBe(false)

		console.log('list own property:',Object.getOwnPropertyNames(model))


		/* Now , to bind the action: that means:
		 * replace the action function with wrapper dispatch function 
		 * */
		function bindAction(action ,dispatch){
			return function(){
				return dispatch(action.apply(this,arguments))
			}
		}
		function bindActions(model : any,dispatch){
			const label		= 'bindActions:'
			console.log(label,'with model:',model)
			/* Check if there is action */
			if(!model.actions){
				throw new Error('The model do not have actions!')
			}
			/* save the old actions for backup*/
			model._actions	= model.actions
			//Object.assign(model._actions,model.actions)
			const boundActions	= {}
			const keys		= Object.keys(model.actions)
			console.log('%s: To bind %s actions',label,keys.length)
			for(let i = 0 ; i < keys.length ; i++){
				const key	= keys[i]
				const action	= model.actions[key]
				if(typeof action === 'function'){
					boundActions[key]	= bindAction(action,dispatch)
				}
			}
			//console.log('%s: bound %s functions',label,boundActions.length)
			model.actions	= boundActions
		}

		function dispatch(actionResult : any){
			console.log('dispatch:',actionResult)
		}
		
		bindActions(model,dispatch)

		model.actions.update()
	})

	it('TestCreate',() => {
		class Model	{
			name	: 'model'
			test(){
				console.log('test')
			}
		}
		const a		= Object.create({})
		console.log('a:',a)
		const b		= Object.create({}.__proto__)
		console.log('b:',b)
		const model	= new Model()
		const c		= Object.create(model)
		console.log('c:',c)
		console.log('c instanceof Model:',c instanceof Model)
		const d		= Object.create(model.__proto__)
		console.log('d:',d)
		console.log('d instanceof Model:',d instanceof Model)
		const e		= Object.create(Model.prototype)
		console.log('e:',e)
		console.log('e instanceof Model:',e instanceof Model)
		console.log(Model.prototype)
	})

	it('TestObjectKey',() => {
		const a		= { b: 1,a:2}
		console.log(a)
		console.log(Object.entries(a))
		console.log(Object.keys(a))
		console.log(Object.values(a))

		const b		= {10:'a',5:'b',1:'c'}
		console.log(b)
		console.log(Object.entries(b))
		console.log(Object.keys(b))
		console.log(Object.values(b))

		const c		= ['a','b','c']
		console.log(c)
		console.log(Object.entries(c))
		console.log(Object.keys(c))
		console.log(Object.values(c))


		//Freeze
		Object.freeze(a)
		Object.freeze(b)
		Object.freeze(c)
		expect(() => {
			a.b		= 3
		}).toThrow()
		expect(() => {
			b[11]	= 3
		}).toThrow()
		expect(() => {
			c.push('d')
		}).toThrow()
	})

	it('TestEqual',() => {
		/* It is incorrect to just use if(ok) to check the true/false */
		let ok	= Promise.resolve()
		if(ok){
		}else{
			expect('fail').toBe('')
		}

		ok	= true
		if(ok === true){
		}else{
			expect('fail').toBe('')
		}

		expect(Object.is('abc','abc')).toBe(true)

		expect('abc' === 'abc').toBe(true)

	})

	it('TestInitializer',() => {
		const o		= {
			a	: 1,
			b	: 2,
		}
		console.log('o:',o)

		const name	= 'tag'
		/* The property name is dynamic */
		const c		= {
			[name]	: 'logger',
			[`d-${new Date().getTime()}`]	: Date.now(),
		}
		console.log('c:',c)
		expect(c.tag).toBe('logger')

		/* Function in object , with THIS */
		const d		= {
			name	: 'logger',
			test(){
				console.log('test')
			},
			print(){
				console.log(`${this.name} printed`)
			},
		}

		d.test()
		d.print()

		const e		= {
			a	: 1,
			b	: 2,
		}
		const f		= {
			b	: 3,
			c	: 4,
		}
		const g		= {...e,...f}
		console.log('g:',g)
		expect(g.b).toBe(3)

		const h		= {...f,...e}
		console.log('h:',h)
		expect(h.b).toBe(2)
	})


})
