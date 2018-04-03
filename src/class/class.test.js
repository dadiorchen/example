/* To demo the usage of class/object , the object-oriented in javascript */
const Model = {
	/* NOTE using this way , we can use 'this' in it, no need to type:'Model.methodB' 
	 * Its a convenience way to create a singleton class/object
	 * */
	methodA(){
		const B = this.methodB()
		console.log('methodA')
		return 'A' + B	
	},
	methodB(){
		console.log('methodB')
		return 'B'
	}
}

describe('TestClass',() => {
	it('TestClass',() => {
		expect(Model.methodA()).toBe('AB')
	})
})
