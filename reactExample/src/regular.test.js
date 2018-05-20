/* Demo for regular express */

describe('Regular',() => {
	it('regular',() => {
		expect(/^This.*abc$/g.test('This is abc')).toBe(true)
	})

	it('regularTestMethod',() => {
		/* To demo usage of test : A regular test just test if a patten do exist in some content 
		 * Not , the whole content match the test patten , unless the patten is like /^....$/
		 * */
		const string	= 'This is a test for regular \'test\' method!'
		//				___01234567890
		expect(/test/.test(string)).toBe(true)
		
		/* Regular with 'g' flag, the test method will ADVANCE */
		const regular	= /test/g
		let counterTest	= 0
//		do{
//			counterTest++
//		}while(regular.test(string))
		expect(regular.lastIndex).toBe(0)
		while(regular.test(string)){
			counterTest++
			if(counterTest === 1){
				//The first 'test' position
				expect(regular.lastIndex).toBe(14)
			}
		}
		expect(counterTest).toBe(2)
	})

	it('flagG',() => {
		/* With g, the match method will find all the element match the patten
		 * if no g, just find the first one */
		const regular	= /\w+\s?/g
		const regularB	= /\w+\s?/
		const string	= 'this is a sentence'
		const match		= string.match(regular)
		console.log(match)
		expect(match).toHaveLength(4)

		/* The match method , will not ADVANCE , however , 
		 * the exec does, but , NOTE, the regular must with flag 'g' to get ADVANCE
		 * */
		let matchB	= string.match(regularB)
		console.log(matchB)
		expect(matchB).toHaveLength(1)
		expect(matchB[0]).toBe('this ')

		matchB		= string.match(regularB)
		console.log(matchB)
		expect(matchB[0]).toBe('this ')

		let matchC	= regular.exec(string)
		console.log(matchC)
		expect(matchC[0]).toBe('this ')

		matchC		= regular.exec(string)
		console.log(matchC)
		expect(matchC[0]).toBe('is ')

	})

	it('flagM',() => {
		/* With m flag, the match method aware this is multiple line content ,
		 * so it find every line with /^.*$/ 
		 * 
		 * */
		const regular	= /^.*$/mg
		const string	= 'line1\nline2\nline3'
		console.log(string)
		const match		= string.match(regular)
		console.log(match)
		expect(match).toEqual(['line1','line2','line3'])


		/* If want to match the whole line , above regular is not OK, 
		 * because the '.' can not match the \n , so , below is OK
		 * */
		console.log(string.match(/^(.|\n)*$/g))
		expect(string.match(/^(.|\n)*$/g)).toEqual([string])
	})

	it('character',() => {
		/* '.' */
		expect(/./.test('')).toBe(false)
		expect(/./.test('a')).toBe(true)
		expect(/./.test('ab')).toBe(true)
		expect(/./.test('abc')).toBe(true)

		/* the '.' do not match the newline \n */
		expect(('line1\nline2').match(/^.*$/)).toBe(null)
		expect(('line1\nline2').match(/^(.|\n)*$/g)).toEqual(['line1\nline2'])
		/* and the [^] match anything, include newline */
		expect(('line1\nline2').match(/^[^]*$/g)).toEqual(['line1\nline2'])

		/* \d */
		expect(/^\d+:\d+$/.test('16:05')).toBe(true)

		/* \D */
		expect(/^\d+\D\d+$/.test('16:05')).toBe(true)

		/* \w  NOTE: do not include . IN 12.9 */
		expect('var a = { name : "logger", value : 25 , fee : $12.9 }'.match(/\w+/g))
			.toEqual(['var','a','name','logger','value','25','fee','12','9'])	
		/* \W */
		expect('var a = { name : "logger", value : 25 , fee : $12.9 }'.match(/\W+/g))
			.toEqual([' ',' = { ',' : "','", ',' : ',' , ',' : $','.',' }'])
			
		/* \s : NOTE \s include the new line */
		expect('var a		= 1 var\nb		= 2'.match(/\s+/g))
			.toEqual([' ','		',' ',' ','\n','		',' '])
			
		/* \S */
		expect('var a		= 1 var\nb		= 2'.match(/\S+/g))
			.toEqual(['var','a','=','1','var','b','=','2'])

		/* \t */
		expect('var a		= 1 var\nb		= 2'.match(/\t+/g))
			.toEqual(['\t\t','\t\t'])

		/* \r*/
		expect('var a		= 1 var\r\nnb		= 2'.match(/\r+/g))
			.toEqual(['\r'])

		/* \n*/
		expect('var a		= 1 var\nnb		= 2\n'.match(/\n+/g))
			.toEqual(['\n','\n'])

		/* \ */
		expect(/\/\*This is comment\*\//.test('/*This is comment*/')).toBe(true)

		/* [] */
		expect('dean-chen@sohu.com'.match(/[a-z]+/g))
			.toEqual(['dean','chen','sohu','com'])
		/* [] with '-' */
		expect('dean-chen@sohu.com'.match(/[a-z-]+/g))
			.toEqual(['dean-chen','sohu','com'])

		expect('note-u-9a522330-54b8-11e8-a2cc-33962ae3ce68'.match(/note-u-[a-z0-9-]+/g))
			.toEqual(['note-u-9a522330-54b8-11e8-a2cc-33962ae3ce68'])

		/* [^] */
		expect('tel-018-222-221'.match(/[^0-9-]+/g))
			.toEqual(['tel'])
		
		/* | */
		expect('www.baidu.com'.match(/com|cn|me/g))
			.toEqual(['com'])
		expect('midinote.me'.match(/com|cn|me/g))
			.toEqual(['me'])

		/* ^ $ */
		expect('test'.match(/^.*$/g))
			.toEqual(['test'])

		/* \b */
		/* the ttag:name do not match */
		expect('content content , tag:logger, this ttag:name '.match(/\btag:\w+/g))
			.toEqual(['tag:logger'])

		/* \B */
		/* the second ex do not match */
		expect('exact,ex'.match(/ex\B/g))
			.toEqual(['ex'])

		/* () */
		{
			/* the nested () (()) */
			/* To demo with or without :80 for URL */
			const url		= /([^:]+):\/\/(([^:]+)(?::(\d+))?)\/(.*)/
			const match		= 'http://www.sohu.com:80/news'.match(url)
			console.log(match)
			expect(match[1]).toBe('http')
			expect(match[2]).toBe('www.sohu.com:80')
			expect(match[3]).toBe('www.sohu.com')
			expect(match[4]).toBe('80')
			expect(match[5]).toBe('news')

			const matchC	= 'http://www.sohu.com/news'.match(url)
			console.log(matchC)
			expect(matchC[2]).toBe('www.sohu.com')


			/* exec */
			const regular	= /(.*):\/\/(.*)\/(.*)/
			const matchB	= regular.exec('http://www.sohu.com/news')
			console.log('regular:',regular)
			console.log('matchB:',matchB)
			expect(matchB[1]).toBe('http')
			expect(matchB[2]).toBe('www.sohu.com')
			expect(matchB[3]).toBe('news')
		}

		/* () \n */
		{
			const path		= '/User/deanchen/test.js' //'/User/deanchen/work/logger/test.js'
			const regular	= /\/([^\/]+)\/([^\/]+)\/([^\/]+)/
			const match		= path.match(regular)
			console.log(match)

			/* here , \1 means (\/) */
			/* If without ?: , then the '/' will be treat as () */
			const regularB	= /(?:\/)([^\/]+)\1([^\/]+)\1([^\/]+)/
			const matchB	= path.match(regularB)
			console.log(matchB)


			/* find repeat group */
			const regularC	= /(\/[^\/]+)/g
			const matchC	= path.match(regularC)
			console.log(matchC)
			expect(matchC).toEqual(['/User','/deanchen','/test.js'])

		}
		{
			const string	= 'http://${POUCH_DB_USER_NAME}:${POUCH_DB_PASSWORD}@192.168.31.180:5984'
			const [,name,password,ip,port]	= string.match(/http:\/\/\$\{(\w+)\}:\$\{(\w+)\}@([0-9.]+):(\d+)/)
			console.log('name:',name,'password:',password,'ip:',ip,'port:',port)
		}

		{
			/* '*' */
			const string	= 'ababab'
			const regular	= /(ab)*/
			const match		= string.match(regular)
			console.log(match)
		}

		{
			/* '+' */
			const string	= '192.168.31.180'
			const regular	= /\d+/g
			console.log(string.match(regular))
			expect(string.match(regular)).toEqual(['192','168','31','180'])
		}

		{
			/* '?' */
			const string	= 'http://www.sohu.com:8888'
			const stringB	= 'http://www.sohu.com'
			const regular	= /^http:\/\/[^:]+(:\d+)?$/
			expect(regular.test(string)).toBe(true)
			expect(regular.test(stringB)).toBe(true)
		}

		{
			/* '*?' non-greedy */
			const string	= '<html>AAA</html>'
			const regular	= /<.*>/g
			const match		= string.match(regular)
			console.log(match)
			expect(match).toEqual(['<html>AAA</html>'])

			const regularB	= /<.*?>/g
			const matchB	= string.match(regularB)
			console.log(matchB)
			expect(matchB).toEqual(['<html>','</html>'])
		}

		{
			const string	= '<html>AAA</html>'
			const regular	= /<.*?>|[^<>]+/g
			let match	= regular.exec(string)
			console.log(match)
			expect(match[0]).toBe('<html>')
			match	= regular.exec(string)
			console.log(match)
			expect(match[0]).toBe('AAA')
			match	= regular.exec(string)
			console.log(match)
			expect(match[0]).toBe('</html>')
		}

		{
			/* {n} */
			/* To check IP */
			const regular	= /^(\d+\.){3}\d+$/
			expect(regular.test('192.168.2.1')).toBe(true)
			expect(regular.test('192.168.2')).toBe(false)
			expect(regular.test('192.168.2.2.2')).toBe(false)
			expect(regular.test('192.168.2.221.')).toBe(false)
		}
	})

	it('{n,m}',() => {
		const regular		= /^(?:\d{1,3}\.){3}\d{1,3}$/
		expect(regular.test('129.231.21.10')).toBe(true)
		expect(regular.test('129.231.21')).toBe(false)
		expect(regular.test('129.231.21.')).toBe(false)
		expect(regular.test('129.231.21.22.111')).toBe(false)
	})

	it('x(?=y)',() => {
		const match		= 'This is a test@sohu.com'.match(/\w+(?=@)/g)
		console.log('match:',match)
		expect(match).toEqual(['test'])
	})

	it('x(?!y)',() => {
		const match		= 'image.js'.match(/\w+(?!\.)/g)
		console.log('match:',match)
		expect(match).toEqual(['imag','js'])
	})

	it('i,y',() => {
		const regular	= /div/ig
		const string	= '<DIV><a>ssss</a><div>sss</div></DIV>'
		console.log(string.match(regular))
		expect(string.match(regular)).toHaveLength(4)

		/* On node, the y is unavailable */
		const y			= /div/y
		console.log(y.lastIndex)
		console.log(y.test(string))
		expect(y.test(string)).toBe(false)
	})

	it('u',() => {
		//const regular		= /\u{97}\u{98}/u
		const regular		= new RegExp('\u{97}','u')
		const string		= 'abc'
		console.log(regular.test(string))
		/* NOTE, can not use 'u' in node */
	})

	it('string.match',() => {
		const regular		= /#[\w-]+/
		const string		= 'This is a note, #n-122-221-11 , and this is ok #n-ss-121-111\nNew line ,#n-ss-dds-122 and with a tail'
		/* The string match can not used for successive match ,
		 * while the exec can */
		console.log(string.match(regular))
		console.log(string.match(regular))

		/* This demo a way to scan a text , to find out all tag with '#', and all text */
		const regularG		= /#[\w-]+/g
		let match
		let offset			= 0
		while((match = regularG.exec(string)) !== null){
			if(offset < match.index){
				console.log('the text:',string.slice(offset,match.index))
				console.warn(string.slice(offset,match.index))
				offset		= regularG.lastIndex
			}
			console.log('match:',match)
			console.warn(match[0])
			console.log('lastIndex:',regularG.lastIndex)
		}
		console.log('final lastIndex:',regularG.lastIndex)
		if(offset < string.length){
			console.log('the text tail:',string.slice(offset))
			console.warn(string.slice(offset))
		}


	})

	it('regular.test',() => {
		const string		= 'This is a note, #n-122-221-11 , and this is ok #n-ss-121-111\nNew line ,#n-ss-dds-122 and with a tail'
		const regular		= /#[\w-]+/g
		let count			= 0
		/* Using test to count some patten */
		for(;
			regular.test(string);
			count++);
		console.log('The count of tag:',count)
	})

	it('() + \n',() => {
		/* Using () + \n to match tag pairs , like <html></html> */
		/* Yes ,is powerful , to parse html content */
		function parseTag(string){
			console.log('to parse text:',string)
			const regular		= /<([^>\/]+)>(.*?)<\/\1>/g
			let match			
			let foundSomething	= false
			while((match = regular.exec(string)) !== null){
				//found a tag
				console.log('match:',match)
				console.warn('Found a tag:',match[1])
				parseTag(match[2])
				foundSomething		= true
			}
			if(!foundSomething){
				console.warn('Found text:',string)
			}
		}
		const string		= '<html><body><div>OK</div><div>New line</div></body></html>'
		parseTag(string)
	})

	it('parse js',() => {
		const code		= `try{
	const ok		= await some()
	if(ok !== true) throw new Error(ERROR.UNKNOWN_ERROR)
}catch(e){
	{
		some()
	}
	throw e
}

if(true){
	some()
}
//other code...`
		console.log('code:\n',code)
		console.log(/try\{[^]*\}catch\(e\)\{[^\}]*?\{[^]*\}[^\}]*?\}/.exec(code))
	})

	it('({})',() => {
		const string		= 'x+y*(a+(b - c)*ss) + s*y + (x - y)* s'
		console.warn('origin:',string)
		function parseP(string){
			const regular		= /\((.*)\)/g
			let match
			while((match = regular.exec(string)) !== null){
				console.log('match:',match)
				console.warn('Found :',match[0])
				parseP(match[1])
			}
		}

		parseP(string)
	})

	it('replace',() => {
		const string		= `setUser(user : User){
		this._user		= user
		this._dbNote.setUser(user)
		this._noteModel.setUser(user)
		this._hashtagModel.setUser(user)
	}`

		console.log('code:',string)

		console.log('without g:',string.replace(/user/,'account'))
		console.log('with g:',string.replace(/user/g,'account'))
		console.log('with g i:',string.replace(/user/ig,'account'))
		
//		console.log('$','borderTop'.replace(/[A-Z]/g, '-' + '$&'.toLowerCase()))


		/* replace function */
		console.log('keep capital:',string.replace(/user/ig,(match) =>{
			return /^[A-Z]/.test(match) ? 'Account': 'account'
		}))

		/* search */
		console.log('search:',string.search(/user/g))

	})

	it('split',() => {
		let string		= 'test'
		console.log(string.split(''))
		console.log(string.split())
		
		string			= 'a, b   , 		d , ss,s,e'
		/* Remove the space */
		console.log(string.split(/\s*,\s*/))
		/* limit */
		console.log(string.split(/\s*,\s*/,2))

	})



})
