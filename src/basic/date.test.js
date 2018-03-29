it('date',() => {
	const a = new Date()
	console.log('date:',a)
	const option = {
		year	: '2-digit',
		month	: '2-digit',
	}
	console.log('date to locale string:',a.toLocaleString())
	console.log('date with option:%s',a.toLocaleString('zh-Hans-CN',option))
})
