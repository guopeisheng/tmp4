var mongoose = require('mongoose')
mongoose.Promise = require('bluebird');
// replace this "localhost" value with the one from heroku/mlab
var url = 'mongodb://heroku_jx66b3z9:bpk551sepj3pb6212cqhuq1i59@ds255715.mlab.com:55715/heroku_jx66b3z9'

if (process.env.MONGOLAB_URI) {
	url = process.env.MONGOLAB_URI;
}

mongoose.connect(url, { useMongoClient: true })

mongoose.connection.on('connected', function () {
	console.log('Mongoose connected to ' + url)
})
mongoose.connection.on('error', function (err) {
	console.error('Mongoose connection error: ' + err)
})
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose disconnected')
})

process.once('SIGUSR2', function () {
	shutdown('nodemon restart', function () {
		process.kill(process.pid, 'SIGUSR2')
	})
})
process.on('SIGINT', function () {
	shutdown('app termination', function () {
		process.exit(0)
	})
})
process.on('SIGTERM', function () {
	shutdown('Heroku app shutdown', function () {
		process.exit(0)
	})
})
function shutdown(msg, callback) {
	mongoose.connection.close(function () {
		console.log('Mongoose disconnected through ' + msg)
		callback()
	})
}