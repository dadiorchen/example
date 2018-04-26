const express = require('express')
const app = express()

app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
});

app.get('/user/1',(req,res) => {
	res.send('OK')
})


app.listen(3003,() => {
	console.log('Server Up!')
})
