/* Demo for object oriented programming,class,object,constructor,extends ... */
//@flow

class A {
	constructor(p){
		console.log('Constructor A',p)
		this.propertyOfA	= 'AAAAA'
		this.propertyOfAA	= 'AAAAAAAAAAAA'
	}

	print(){
		console.log('print in A')
	}

	thisTry(){
		console.log('This is This:')
		console.log('this try:',this.propertyOfA)
	}
}

class B extends A {
	constructor(p	,pB ){
		super(p)
		console.log('this in constructor of B:',this)
		console.log('propertyOfAA in constructor of B:',this.propertyOfAA)
		this.propertyOfB	= 'BBBBB'
		this.propertyOfAA	= 'BBBBBBBBBBBB'
		console.log('Constructor B',p,pB)
	}

//	print(){
//		console.log('print in B')
//	}
}

class C {}

Object.setPrototypeOf(C.prototype,A.prototype)

debugger
console.log('A.prototype:',A.prototype)
console.log('Object.getPrototypeOf A:',Object.getPrototypeOf(A))
console.log('Object.getPrototypeOf B:',Object.getPrototypeOf(B))
console.log('B.prototype:',B.prototype)
console.log('A.prototype === B.prototype:',A.prototype === B.prototype)


describe('TestOO',() => {
	it('TestOO',() => {
		const a		= new A()
		console.log('a:',a)
		const b		= new B('OK','DDD')
		console.log('b:',b)
		console.log('b.propertyOfA:',b.propertyOfA)
		console.log('b.propertyOfB:',b.propertyOfB)
		console.log('b.propertyOfAA:',b.propertyOfAA)
		b.print()

		const c		= new C('CC')
		console.log('c:',c)
		console.log('c.propertyOfA:',c.propertyOfA)
		c.print()
	})

	it('TestThis',() => {
		const a		= new A()
		a.thisTry()
		console.log('thisTry function:',a.thisTry)
		let tryTry	= a.thisTry
		console.log('tryTry:',tryTry)
		tryTry()
	})
})




/* Demo static */
class S {
	static staticMethod(){
		console.log('This is staic...')
	}
	//static staticProperty		= 1
}


it('TestStatic',() => {
	S.staticMethod()
	console.log('Static property:',S.staticProperty)
	const s		= new S()
	console.log('Static property:',s.staticProperty)

	S.staticProperty	= 2
	console.log('Static property:',S.staticProperty)
	S.staticMethod		= () => console.log('This is a new static ....')
	S.staticMethod()
})




/* Demo inherit /constructor / prototype */
class Woman {
	constructor(name){
		this.name		= name
		/* This function is defined on every object instance : woman.haveSex */
		this.haveSex	= function(){
			console.log('a  a a a ...')
		}
	}

	/* This function is defined on the Woman.prototype */
	speak(){
		console.log('I am a woman:',this.name)
	}
}

class Whore extends Woman{
	constructor(name){
		super(name)
		
		/* This will override the function on the parents' */
		this.haveSex	= function(){
			console.log('a a a a a ,yea yea ...')
		}
	}

	deal(){
		console.log('I am charged:10$',this.name)
	}
}

it('TestInherit',() => {
	const woman 	= new Woman('jane')
	woman.haveSex()
	woman.speak()
	
	expect(woman.haveSex).toBeDefined()
	expect(woman.speak).toBeDefined()

	console.log(woman.__proto__.speak)
	console.log(woman.__proto__.haveSex)
	expect(woman.__proto__.speak).toBeDefined()
	expect(woman.__proto__.haveSex).toBeUndefined()

	const whore		= new Whore('rose')
	whore.deal()
	whore.haveSex()
	console.log(whore)
})
