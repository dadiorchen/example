const express =  require('express')
const app	= express()

/* This demo the way to work around cross site problem */
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/api/user/1',(req,res) => {
	const {User} = require('./User.js')
	const user = new User()
	res.json(user)
})


app.listen(3001,() => {
	console.log('Server is up!')
})
